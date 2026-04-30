import { inject } from "@angular/core";
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

  withComputed(({ list }) => ({
  })),

  withMethods((store, tabelaService = inject(TabelaService)) => ({
    carregaLista: signalMethod((params: { empresa: string }) => {
      if (store.list.length > 0) return;
      patchState(store, { isLoading: true });
      tabelaService.findAll({ empresa: params.empresa }).subscribe({
        next: (list) => {
          patchState(store, (state) => ({
            ...state,
            list,
            isLoading: false,
          }));
        },
      });
    }),
    carregaListaVazia: signalMethod(async () => {
      await new Promise((resolve) => setTimeout(resolve, 100));
      patchState(store, (state) => ({
        ...state,
        list: [],
      }));
    }),

    create: signalMethod(async (params: { data: Partial<TabelaModel> }) => {
      patchState(store, { isLoading: true });
      await new Promise((resolve) => setTimeout(resolve, 100));
      const id = await tabelaService.create(params.data as TabelaModel);
      patchState(store, (state) => ({
        ...state,
        list: [...state.list, { ...(params.data as TabelaModel), id }],
        isLoading: false,
      }));
    }),

    updateById: signalMethod(async (params: { id: string; data: Partial<TabelaModel> }) => {
      patchState(store, { isLoading: true });
      await new Promise((resolve) => setTimeout(resolve, 100));
      await tabelaService.updateById(params.id, params.data as TabelaModel);
      patchState(store, (state) => ({
        ...state,
        list: state.list.map((f) =>
          f.id === params.id ? { ...f, ...(params.data as TabelaModel) } : f,
        ),
        isLoading: false,
      }));
    }),

    deleteById: signalMethod(async (params: { id: string }) => {
      patchState(store, { isLoading: true });
      await new Promise((resolve) => setTimeout(resolve, 100));
      await tabelaService.deleteById(params.id.toString());
      patchState(store, (state) => ({
        ...state,
        list: state.list.filter((f) => f.id !== params.id.toString()),
        isLoading: false,
      }));
    }),
  })),
  withHooks((store) => ({
    onInit() {
      store.carregaLista({ empresa: '1' });
    },
  })),
);
