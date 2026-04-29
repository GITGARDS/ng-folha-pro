import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { patchState, signalMethod, signalStore, withComputed, withHooks, withMethods, withState } from "@ngrx/signals";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { delay, pipe } from "rxjs";
import { FuncionarioStore } from "../../funcionario/shared/funcionario.store";
import { EmpresaLogadaModel, EmpresaModel } from "./empresa.model";
import { EmpresaService } from "./empresa.service";

type EmpresaState = {
  list: EmpresaModel[];
  empresaLogada: EmpresaLogadaModel;
  isLoading: boolean;
};

const initialState: EmpresaState = {
  list: [],
  empresaLogada: {} as EmpresaLogadaModel,
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
          .findAll()
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

      create: signalMethod(async (params: {data: Partial<EmpresaModel>}) => {
        patchState(store, { isLoading: true });
        await new Promise((resolve) => setTimeout(resolve, 100));
        const id = await empresaService.create(params.data as EmpresaModel);
        patchState(store, (state) => ({
          ...state,
          list: [...state.list, { ...(params.data as EmpresaModel), id }],
          isLoading: false,
        }));
      }),

      login: signalMethod(async (params: { data: Partial<EmpresaModel> }) => {
        patchState(store, { isLoading: true });
        await new Promise((resolve) => setTimeout(resolve, 100));
        await empresaService.login(params.data.id as string).then(() => {
          patchState(store, (state) => ({
            ...state,
            empresaLogada: {
              empresa: params.data as EmpresaModel,
              isLogada: true,
            },
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
            empresaLogada: {} as EmpresaLogadaModel,
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

      updateById: signalMethod(async (params: { id: string; data: Partial<EmpresaModel> }) => {
        patchState(store, { isLoading: true });
        await new Promise((resolve) => setTimeout(resolve, 100));
        await empresaService.updateById(params.id, params.data as EmpresaModel);
        patchState(store, (state) => ({
          ...state,
          list: state.list.map((f) => (f.id === params.id ? { ...f, ...params.data } : f)),
          isLoading: false,
        }));
      }),

      deleteById: signalMethod(async (params: { id: string }) => {
        patchState(store, { isLoading: true });
        await new Promise((resolve) => setTimeout(resolve, 100));
        await empresaService.deleteById(params.id.toString());
        patchState(store, (state) => ({
          ...state,
          list: state.list.filter((f) => f.id !== params.id.toString()),
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
