import { inject } from "@angular/core";
import { patchState, signalMethod, signalStore, withComputed, withHooks, withMethods, withState } from "@ngrx/signals";
import { delay } from "rxjs";
import { TIME_DELAY } from "../../../core/shared/consts";
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

  withComputed(({ list }) => ({})),

  withMethods((store, tabelaService = inject(TabelaService)) => ({
    carregaLista: signalMethod(() => {
      if (store.list.length > 0) return;
      patchState(store, { isLoading: true });
      tabelaService
        .findAll({})
        .pipe(delay(TIME_DELAY))
        .subscribe({
          next: (list) => {
            patchState(store, (state) => ({
              ...state,
              list: list,
              isLoading: false,
            }));
          },
        });
    }),
    carregaListaVazia: signalMethod(async () => {
      await new Promise((resolve) => setTimeout(resolve, TIME_DELAY));
      patchState(store, (state) => ({
        ...state,
        list: [],
      }));
    }),

    create: signalMethod(async ({ data }: { data: Partial<TabelaModel> }) => {
      patchState(store, { isLoading: true });
      await new Promise((resolve) => setTimeout(resolve, TIME_DELAY));
      const id = await tabelaService.create({ data: data as TabelaModel });
      patchState(store, (state) => ({
        ...state,
        list: [...state.list, { ...(data as TabelaModel), id }],
        isLoading: false,
      }));
    }),

    updateById: signalMethod(async ({ id, data }: { id: string; data: Partial<TabelaModel> }) => {
      patchState(store, { isLoading: true });
      await new Promise((resolve) => setTimeout(resolve, TIME_DELAY));
      await tabelaService.updateById({ id, data: data as TabelaModel });
      patchState(store, (state) => ({
        ...state,
        list: state.list.map((f) => (f.id === id ? { ...f, ...(data as TabelaModel) } : f)),
        isLoading: false,
      }));
    }),

    deleteById: signalMethod(async (params: { id: string }) => {
      patchState(store, { isLoading: true });
      await new Promise((resolve) => setTimeout(resolve, TIME_DELAY));
      await tabelaService.deleteById({ id: params.id.toString() });
      patchState(store, (state) => ({
        ...state,
        list: state.list.filter((f) => f.id !== params.id.toString()),
        isLoading: false,
      }));
    }),
  })),
  withHooks((store) => ({
    onInit() {
      store.carregaLista(null);
    },
  })),
);
