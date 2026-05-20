import { computed, inject } from "@angular/core";
import { patchState, signalMethod, signalStore, withComputed, withHooks, withMethods, withState } from "@ngrx/signals";
import { TIME_DELAY } from "../../../core/shared/consts";
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
      patchState(store, { isLoading: true });
      prodesService.findAll({}).subscribe({
        next: (list) => {
          patchState(store, (state) => ({
            ...state,
            list: list,
            isLoading: false,
          }));
        },
        error: () => patchState(store, { isLoading: false }),
        complete: () => patchState(store, { isLoading: false }),
      });
    }),
    carregaListaVazia: signalMethod(async () => {
      await new Promise((resolve) => setTimeout(resolve, TIME_DELAY));
      patchState(store, (state) => ({
        ...state,
        list: [],
      }));
    }),

    create: signalMethod(async ({ data }: { data: Partial<ProdesModel> }) => {
      patchState(store, { isLoading: true });
      prodesService.create({ data: data as ProdesModel }).subscribe({
        next: (id) => {
          patchState(store, (state) => ({
            ...state,
            list: [...state.list, { ...(data as ProdesModel), id }],
            isLoading: false,
          }));
        },
        error: () => patchState(store, { isLoading: false }),
        complete: () => patchState(store, { isLoading: false }),
      });
    }),

    updateById: signalMethod(async ({ id, data }: { id: string; data: Partial<ProdesModel> }) => {
      patchState(store, { isLoading: true });
      prodesService.updateById({ id, data: data as ProdesModel }).subscribe({
        next: () => {
          patchState(store, (state) => ({
            ...state,
            list: state.list.map((f) => (f.id === id ? { ...f, ...(data as ProdesModel) } : f)),
            isLoading: false,
          }));
        },
        error: () => patchState(store, { isLoading: false }),
        complete: () => patchState(store, { isLoading: false }),
      });
    }),

    deleteById: signalMethod(async (params: { id: string }) => {
      patchState(store, { isLoading: true });
      prodesService.deleteById({ id: params.id.toString() }).subscribe({
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
  withHooks((store) => ({
    onInit() {
      store.carregaLista(null);
    },
  })),
);
