import { computed, inject } from "@angular/core";
import { Router } from "@angular/router";
import { patchState, signalMethod, signalStore, withComputed, withHooks, withMethods, withState } from "@ngrx/signals";
import { TabelaModel } from "./tabela.model";
import { TabelaService } from "./tabela.service";

type TabelaState = {
  list: TabelaModel[];
  isLoading: boolean;
};

const initialState: TabelaState = {
  list: [],
  isLoading: false,
};

export const TabelaStore = signalStore(
  {
    providedIn: 'root',
  },
  withState(initialState),

  withComputed(({list}) => ({
    totalAtivos: computed(() => list().filter((f) => f.ativo)),
  })),

  withMethods(
    (store, tabelaService = inject(TabelaService), router = inject(Router)) => ({
      carregaLista: signalMethod(async () => {
        if (store.list.length > 0) return;
        patchState(store, { isLoading: true });
        await tabelaService.findAll().then((list) => {
          patchState(store, (state) => ({
            ...state,
            list,
            isLoading: false,
          }));
        });
      }),

      create: signalMethod(async (param: { data: Partial<TabelaModel> }) => {
        patchState(store, { isLoading: true });
        await tabelaService.create(param.data as TabelaModel).then((list) => {
          patchState(store, (state) => ({
            ...state,
            list,
            isLoading: false,
          }));
        });
      }),

      updateById: signalMethod(async (params: { id: string; data: Partial<TabelaModel> }) => {
        patchState(store, { isLoading: true });
        await tabelaService.updateById(params.id, params.data as TabelaModel).then((list) => {
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
        await tabelaService.deleteById(id.toString()).then((list) => {
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
