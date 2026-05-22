import { effect, inject } from "@angular/core";
import { Router } from "@angular/router";
import { patchState, signalMethod, signalStore, withComputed, withHooks, withMethods, withProps, withState } from "@ngrx/signals";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { delay, pipe } from "rxjs";
import { AppService } from "../../../core/shared/services/app.service";
import { EmpresaModel } from "./empresa.model";
import { EmpresaService } from "./empresa.service";

type EmpresaState = {
  list: EmpresaModel[];
  empresaLogada: EmpresaModel | null;
  isLoading: boolean;
  msg: string;
};

const initialState: EmpresaState = {
  list: [],
  empresaLogada: null,
  isLoading: false,
  msg: '',
};

export const EmpresaStore = signalStore(
  {
    providedIn: 'root',
  },
  withState(initialState),

  withProps(() => ({
    router: inject(Router),
    empresaService: inject(EmpresaService),
    appService: inject(AppService),
  })),

  withComputed(({ list }) => ({})),

  withMethods(({ empresaService, router, ...store }) => ({
    teste: rxMethod<unknown>(pipe(delay(2000))),

    carregaLista: signalMethod(() => {
      patchState(store, { isLoading: true });
      empresaService.findAll({}).subscribe({
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

    create: signalMethod(({ data }: { data: Partial<EmpresaModel> }) => {
      patchState(store, { isLoading: true });
      empresaService.create({ data: data as EmpresaModel }).subscribe({
        next: (id) => {
          patchState(store, (state) => ({
            ...state,
            list: [...state.list, { ...(data as EmpresaModel), id }],
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

    login: signalMethod(({ data }: { data: Partial<EmpresaModel> }) => {
      patchState(store, { isLoading: true });
      patchState(store, (state) => ({
        ...state,
        empresaLogada: data as EmpresaModel,
        isLoading: false,
        msg: 'Login efetuado com sucesso',
      }));
    }),

    logout: signalMethod(() => {
      patchState(store, { isLoading: true });
      patchState(store, (state) => ({
        ...state,
        empresaLogada: null,
        isLoading: false,
        msg: 'Logout efetuado com sucesso',
      }));
      setTimeout(() => {
        router.navigate(['empresa']);
      }, 500);
    }),

    updateById: signalMethod(({ id, data }: { id: string; data: Partial<EmpresaModel> }) => {
      patchState(store, { isLoading: true });
      empresaService.updateById({ id, data: data as EmpresaModel }).subscribe({
        next: () => {
          patchState(store, (state) => ({
            ...state,
            list: state.list.map((f) => (f.id === id ? { ...f, ...(data as EmpresaModel) } : f)),
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
      empresaService.deleteById({ id: params.id.toString() }).subscribe({
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
