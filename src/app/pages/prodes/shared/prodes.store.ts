import { computed, inject } from "@angular/core";
import { patchState, signalMethod, signalStore, withComputed, withHooks, withMethods, withState } from "@ngrx/signals";
import { ProdesModel } from "./prodes.model";
import { ProdesService } from "./prodes.service";

type ProdesState = {
  list: ProdesModel[];
  isLoading: boolean;
};

const initialState: ProdesState = {
  list: [],
  isLoading: false,
};

export const ProdesStore = signalStore(
  {
    providedIn: 'root',
  },
  withState(initialState),

  withComputed(({ list }) => ({
    totalAtivos: computed(() => list().filter((f) => f.ativo === true)),
  })),

  withMethods((store, prodesService = inject(ProdesService)) => ({
    carregaLista: signalMethod(() => {
      if (store.list.length > 0) return;
      patchState(store, { isLoading: true });
      prodesService.findAll().subscribe({
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

    create: signalMethod(async (params: { data: Partial<ProdesModel> }) => {
      patchState(store, { isLoading: true });
      await new Promise((resolve) => setTimeout(resolve, 100));
      const id = await prodesService.create(params.data as ProdesModel);
      patchState(store, (state) => ({
        ...state,
        list: [...state.list, { ...(params.data as ProdesModel), id }],
        isLoading: false,
      }));
    }),

    updateById: signalMethod(async (params: { id: string; data: Partial<ProdesModel> }) => {
      patchState(store, { isLoading: true });
      await new Promise((resolve) => setTimeout(resolve, 100));
      await prodesService.updateById(params.id, params.data as ProdesModel);
      patchState(store, (state) => ({
        ...state,
        list: state.list.map((f) =>
          f.id === params.id ? { ...f, ...(params.data as ProdesModel) } : f,
        ),
        isLoading: false,
      }));
    }),

    deleteById: signalMethod(async (params: { id: string }) => {
      patchState(store, { isLoading: true });
      await new Promise((resolve) => setTimeout(resolve, 100));
      await prodesService.deleteById(params.id.toString());
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
