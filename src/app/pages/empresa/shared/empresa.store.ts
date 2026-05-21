import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { patchState, signalMethod, signalStore, withComputed, withHooks, withMethods, withProps, withState } from "@ngrx/signals";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { delay, pipe } from "rxjs";
import { TIME_DELAY } from "../../../core/shared/consts";
import { FuncionarioStore } from "../../funcionario/shared/funcionario.store";
import { EmpresaModel } from "./empresa.model";
import { EmpresaService } from "./empresa.service";

type EmpresaState = {
  list: EmpresaModel[];
  isLoading: boolean;
};

const initialState: EmpresaState = {
  list: [],
  isLoading: false,
};

export const EmpresaStore = signalStore(
  {
    providedIn: 'root',
  },
  withState(initialState),

  withProps(() => ({
    empresaService: inject(EmpresaService),
    router: inject(Router),
    funcionarioStore: inject(FuncionarioStore),
  })),

  withComputed(({list}) => ({})),

  withMethods(({funcionarioStore, empresaService, router, ...store}) => ({
    teste: rxMethod<unknown>(pipe(delay(2000))),

    carregaLista: signalMethod(() => {
      patchState(store, { isLoading: true });
      empresaService.findAll({}).subscribe({
        next: (list) => {
          patchState(store, (state) => ({
            ...state,
            list,
            isLoading: false,
          }));
        },
        error: () => patchState(store, { isLoading: false }),
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
          }));
        },
        error: () => patchState(store, { isLoading: false }),
        complete: () => patchState(store, { isLoading: false }),
      });
    }),

    login: signalMethod(async ({ data }: { data: Partial<EmpresaModel> }) => {
      patchState(store, { isLoading: true });
      await new Promise((resolve) => setTimeout(resolve, TIME_DELAY));
      await empresaService.login({ empresa: data as EmpresaModel }).then(() => {
        patchState(store, (state) => ({
          ...state,
          empresaLogada: data as EmpresaModel,
          isLoading: false,
        }));
      });
    }),

    logout: async () => {
      patchState(store, { isLoading: true });
      await new Promise((resolve) => setTimeout(resolve, 100));
      await empresaService.logout().then(() => {
        patchState(store, (state) => ({
          ...state,
          empresaLogada: {} as EmpresaModel | null,
          isLoading: false,
        }));
      });
      funcionarioStore.setList([]);
      switch (router.url) {
        case '/departamento': {
          router.navigate(['empresa']);
          break;
        }
        case '/funcionario': {
          router.navigate(['empresa']);
          break;
        }
      }
    },

    updateById: signalMethod(({ id, data }: { id: string; data: Partial<EmpresaModel> }) => {
      patchState(store, { isLoading: true });
      empresaService.updateById({ id, data: data as EmpresaModel }).subscribe({
        next: () => {
          patchState(store, (state) => ({
            ...state,
            list: state.list.map((f) => (f.id === id ? { ...f, ...(data as EmpresaModel) } : f)),
            isLoading: false,
          }));
        },
        error: () => patchState(store, { isLoading: false }),
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
          }));
        },
        error: () => patchState(store, { isLoading: false }),
        complete: () => patchState(store, { isLoading: false }),
      });
    }),
  })),
  withHooks(({...store}) => ({
    onInit() {
      store.carregaLista(null);
    },
  })),
);
