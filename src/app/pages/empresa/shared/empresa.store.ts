import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { patchState, signalMethod, signalStore, withComputed, withHooks, withMethods, withState } from "@ngrx/signals";
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

  withComputed((store) => ({})),

  withMethods(
    (store, empresaService = inject(EmpresaService), router = inject(Router)) => ({
      carregaLista: signalMethod(async () => {
        if (store.list.length > 0) return;
        patchState(store, { isLoading: true });
        await empresaService.findAll().then((list) => {
          patchState(store, (state) => ({
            ...state,
            list,
            isLoading: false,
          }));
        });
      }),

      create: signalMethod(async (param: { data: Partial<EmpresaModel> }) => {
        patchState(store, { isLoading: true });
        await empresaService.create(param.data).then((list) => {
          patchState(store, (state) => ({
            ...state,
            list,
            isLoading: false,
          }));
        });
      }),

      updateById: signalMethod(async (params: { id: string; data: Partial<EmpresaModel> }) => {
        patchState(store, { isLoading: true });
        await empresaService.updateById(params.id, params.data).then((list) => {
          console.log('update', list);
          patchState(store, (state) => ({
            ...state,
            list,
            isLoading: false,
          }));
        });
      }),

      deleteById: signalMethod(async (id: string) => {
        patchState(store, { isLoading: true });
        await empresaService.deleteById(id.toString()).then((list) => {
          patchState(store, (state) => ({
            ...state,
            list,
            isLoading: false,
          }));
        });
      }),
    }),
  ),
  withHooks((store) => ({
    onInit() {
      store.carregaLista(null);
    },
  })),
);
