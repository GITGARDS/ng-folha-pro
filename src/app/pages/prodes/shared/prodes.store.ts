import { computed, effect, inject } from "@angular/core";
import { Router } from "@angular/router";
import { patchState, signalMethod, signalStore, withComputed, withHooks, withMethods, withProps, withState } from "@ngrx/signals";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { delay, pipe } from "rxjs";
import { AppService } from "../../../core/shared/services/app.service";
import { ProdesModel } from "./prodes.model";
import { ProdesService } from "./prodes.service";

type ProdesState = {
  list: ProdesModel[];
  prodesLogada: ProdesModel | null;
  isLoading: boolean;
  msg: string;
};

const initialState: ProdesState = {
  list: [],
  prodesLogada: null,
  isLoading: false,
  msg: '',
};

export const ProdesStore = signalStore(
  {
    providedIn: 'root',
  },
  withState(initialState),

  withProps(() => ({
    router: inject(Router),
    prodesService: inject(ProdesService),
    appService: inject(AppService),
  })),

  withComputed(({ list }) => ({
    totalAtivos: computed(() => list().filter((f) => f.ativo === true)),
  })),

  withMethods(({ prodesService, router, ...store }) => ({
    teste: rxMethod<unknown>(pipe(delay(2000))),

    carregaLista: signalMethod(() => {
      patchState(store, { isLoading: true });
      prodesService.findAll({}).subscribe({
        next: (list) => {
          patchState(store, (state) => ({
            ...state,
            list,
            isLoading: false,
            msg: 'Listagem carregada com sucesso',
          }));
        },
        error: (err) => {
          patchState(
            store,
            { isLoading: false },
            { msg: 'Erro ao carregar listagem, ' + err.message },
          );
        },

        complete: () => patchState(store, { isLoading: false }),
      });
    }),

    create: signalMethod(({ data }: { data: Partial<ProdesModel> }) => {
      patchState(store, { isLoading: true });
      prodesService.create({ data: data as ProdesModel }).subscribe({
        next: (id) => {
          patchState(store, (state) => ({
            ...state,
            list: [...state.list, { ...(data as ProdesModel), id }],
            isLoading: false,
            msg: 'Registro criado com sucesso',
          }));
        },
        error: (err) => {
          patchState(
            store,
            { isLoading: false },
            { msg: 'Erro ao criar registro, ' + err.message },
          );
        },
        complete: () => patchState(store, { isLoading: false }),
      });
    }),

    login: signalMethod(({ data }: { data: Partial<ProdesModel> }) => {
      patchState(store, { isLoading: true });
      patchState(store, (state) => ({
        ...state,
        prodesLogada: data as ProdesModel,
        isLoading: false,
        msg: 'Login efetuado com sucesso',
      }));
    }),

    logout: signalMethod(() => {
      patchState(store, { isLoading: true });
      patchState(store, (state) => ({
        ...state,
        prodesLogada: null,
        isLoading: false,
        msg: 'Logout efetuado com sucesso',
      }));
      setTimeout(() => {
        router.navigate(['prodes']);
      }, 500);
    }),

    updateById: signalMethod(({ id, data }: { id: string; data: Partial<ProdesModel> }) => {
      patchState(store, { isLoading: true });
      prodesService.updateById({ id, data: data as ProdesModel }).subscribe({
        next: () => {
          patchState(store, (state) => ({
            ...state,
            list: state.list.map((f) => (f.id === id ? { ...f, ...(data as ProdesModel) } : f)),
            isLoading: false,
            msg: 'Registro atualizado com sucesso',
          }));
        },
        error: (err) => {
          patchState(
            store,
            { isLoading: false },
            { msg: 'Erro ao atualizar registro, ' + err.message },
          );
        },
        complete: () => patchState(store, { isLoading: false }),
      });
    }),

    deleteById: signalMethod((params: { id: string }) => {
      patchState(store, { isLoading: true });
      prodesService.deleteById({ id: params.id.toString() }).subscribe({
        next: () => {
          patchState(store, (state) => ({
            ...state,
            list: state.list.filter((f) => f.id !== params.id.toString()),
            isLoading: false,
            msg: 'Registro excluído com sucesso',
          }));
        },
        error: (err) => {
          patchState(
            store,
            { isLoading: false },
            { msg: 'Erro ao excluir registro, ' + err.message },
          );
        },
        complete: () => patchState(store, { isLoading: false }),
      });
    }),
  })),
  withHooks(({ appService, ...store }) => ({
    onInit() {
      store.carregaLista(null);
      effect(() => appService.openSnackBar(store.msg()));
    },
  })),
);
