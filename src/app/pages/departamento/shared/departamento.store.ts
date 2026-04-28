import { computed, inject } from "@angular/core";
import { Router } from "@angular/router";
import { patchState, signalMethod, signalStore, withComputed, withHooks, withMethods, withState } from "@ngrx/signals";
import { DepartamentoModel } from "./departamento.model";
import { DepartamentoService } from "./departamento.service";

type DepartamentoState = {
  list: DepartamentoModel[];
  isLoading: boolean;
};

const initialState: DepartamentoState = {
  list: [],
  isLoading: false,
};

export const DepartamentoStore = signalStore(
  {
    providedIn: 'root',
  },
  withState(initialState),

  withComputed(({ list }) => ({
    totalAtivos: computed(() => list().filter((f) => f.ativo)),
  })),

  withMethods(
    (store, departamentoService = inject(DepartamentoService), router = inject(Router)) => ({
      carregaLista: signalMethod(async () => {
        if (store.list.length > 0) return;
        patchState(store, { isLoading: true });
        await departamentoService.findAll().then((list) => {
          patchState(store, (state) => ({
            ...state,
            list,
            isLoading: false,
          }));
        });
      }),

      create: signalMethod(async (param: { data: Partial<DepartamentoModel> }) => {
        patchState(store, { isLoading: true });
        await departamentoService.create(param.data as DepartamentoModel).then((list) => {
          patchState(store, (state) => ({
            ...state,
            list,
            isLoading: false,
          }));
        });
      }),

      updateById: signalMethod(async (params: { id: string; data: Partial<DepartamentoModel> }) => {
        patchState(store, { isLoading: true });
        await departamentoService.updateById(params.id, params.data as DepartamentoModel).then((list) => {
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
        await departamentoService.deleteById(id.toString()).then((list) => {
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
