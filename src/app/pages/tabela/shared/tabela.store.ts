import { effect, inject } from "@angular/core";
import { Router } from "@angular/router";
import { patchState, signalMethod, signalStore, withComputed, withHooks, withMethods, withProps, withState } from "@ngrx/signals";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { delay, pipe } from "rxjs";
import { AppService } from "../../../core/shared/services/app.service";
import { TabelaModel } from "./tabela.model";
import { TabelaService } from "./tabela.service";

type TabelaState = {
  list: TabelaModel[];
  tabelaLogada: TabelaModel | null;
  isLoading: boolean;
  msg: string;
};

const initialState: TabelaState = {
  list: [],
  tabelaLogada: null,
  isLoading: false,
  msg: '',
};

export const TabelaStore = signalStore(
  {
    providedIn: 'root',
  },
  withState(initialState),

  withProps(() => ({
    router: inject(Router),
    tabelaService: inject(TabelaService),
    appService: inject(AppService),
  })),

  withComputed(() => ({})),

  withMethods(({ tabelaService, router, ...store }) => ({
    teste: rxMethod<unknown>(pipe(delay(2000))),

    carregaLista: signalMethod(() => {
      patchState(store, { isLoading: true });
      tabelaService.findAll({}).subscribe({
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

    create: signalMethod(({ data }: { data: Partial<TabelaModel> }) => {
      patchState(store, { isLoading: true });
      tabelaService.create({ data: data as TabelaModel }).subscribe({
        next: (id) => {
          patchState(store, (state) => ({
            ...state,
            list: [...state.list, { ...(data as TabelaModel), id }],
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

    login: signalMethod(({ data }: { data: Partial<TabelaModel> }) => {
      patchState(store, { isLoading: true });
      patchState(store, (state) => ({
        ...state,
        tabelaLogada: data as TabelaModel,
        isLoading: false,
        msg: 'Login efetuado com sucesso',
      }));
    }),

    logout: signalMethod(() => {
      patchState(store, { isLoading: true });
      patchState(store, (state) => ({
        ...state,
        tabelaLogada: null,
        isLoading: false,
        msg: 'Logout efetuado com sucesso',
      }));
      setTimeout(() => {
        router.navigate(['tabela']);
      }, 500);
    }),

    updateById: signalMethod(({ id, data }: { id: string; data: Partial<TabelaModel> }) => {
      patchState(store, { isLoading: true });
      tabelaService.updateById({ id, data: data as TabelaModel }).subscribe({
        next: () => {
          patchState(store, (state) => ({
            ...state,
            list: state.list.map((f) => (f.id === id ? { ...f, ...(data as TabelaModel) } : f)),
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
      tabelaService.deleteById({ id: params.id.toString() }).subscribe({
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
