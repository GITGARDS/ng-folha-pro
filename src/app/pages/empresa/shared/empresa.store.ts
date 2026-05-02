import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { patchState, signalMethod, signalStore, withComputed, withHooks, withMethods, withState } from "@ngrx/signals";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { delay, pipe } from "rxjs";
import { FuncionarioStore } from "../../funcionario/shared/funcionario.store";
import { EmpresaModel } from "./empresa.model";
import { EmpresaService } from "./empresa.service";

type EmpresaState = {
  list: EmpresaModel[];
  empresaLogada: EmpresaModel | null;
  isLoading: boolean;
};

const initialState: EmpresaState = {
  list: [],
  empresaLogada: {} as EmpresaModel | null,
  isLoading: false,
};

export const EmpresaStore = signalStore(
  {
    providedIn: 'root',
  },
  withState(initialState),

  withComputed((store) => ({})),

  withMethods(
    (
      store,
      empresaService = inject(EmpresaService),
      router = inject(Router),
      funcionarioStore = inject(FuncionarioStore),
    ) => ({
      teste: rxMethod<unknown>(pipe(delay(2000))),

      carregaLista: signalMethod(() => {
        if (store.list.length > 0) return;
        patchState(store, { isLoading: true });
        empresaService
          .findAll({})
          .pipe(delay(200))
          .subscribe({
            next: (list) => {
              console.log('findall', list);
              patchState(store, (state) => ({
                ...state,
                list,
                isLoading: false,
              }));
            },
          });
      }),

      create: signalMethod(async ({ data }: { data: Partial<EmpresaModel> }) => {
        patchState(store, { isLoading: true });
        await new Promise((resolve) => setTimeout(resolve, 100));
        const id = await empresaService.create({ data: data as EmpresaModel });
        patchState(store, (state) => ({
          ...state,
          list: [...state.list, { ...(data as EmpresaModel), id }],
          isLoading: false,
        }));
      }),

      login: signalMethod(async ({ data }: { data: Partial<EmpresaModel> }) => {
        console.log('login', data);
        patchState(store, { isLoading: true });
        await new Promise((resolve) => setTimeout(resolve, 100));
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
        funcionarioStore.carregaListaVazia(null);
        switch (router.url) {
          case '/funcionario': {
            router.navigate(['empresa']);
            break;
          }
        }
      },

      updateById: signalMethod(async ({id, data}: { id: string; data: Partial<EmpresaModel> }) => {
        patchState(store, { isLoading: true });
        await new Promise((resolve) => setTimeout(resolve, 100));
        await empresaService.updateById({ id, data: data as EmpresaModel });
        patchState(store, (state) => ({
          ...state,
          list: state.list.map((f) => (f.id === id ? { ...f, ...data } : f)),
          isLoading: false,
        }));
      }),

      deleteById: signalMethod(async ({id}: { id: string }) => {
        patchState(store, { isLoading: true });
        await new Promise((resolve) => setTimeout(resolve, 100));
        await empresaService.deleteById({ id: id.toString() });
        patchState(store, (state) => ({
          ...state,
          list: state.list.filter((f) => f.id !== id.toString()),
          isLoading: false,
        }));
      }),
    }),
  ),
  withHooks((store) => ({
    onInit() {
      store.carregaLista(null);
    },
  })),
);
