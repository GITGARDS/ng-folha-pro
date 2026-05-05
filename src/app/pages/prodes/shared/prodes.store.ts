import { computed, inject } from "@angular/core";
import { patchState, signalMethod, signalStore, withComputed, withHooks, withMethods, withState } from "@ngrx/signals";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { delay, pipe } from "rxjs";
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

  withMethods(
    (
      store,
      prodesService = inject(ProdesService),
    ) => ({
      teste: rxMethod<unknown>(pipe(delay(2000))),

      carregaLista: signalMethod(() => {
        if (store.list.length > 0) return;
        patchState(store, { isLoading: true });
        prodesService
          .findAll({})
          .pipe(delay(50))
          .subscribe({
            next: (list) => {
              patchState(store, (state) => ({
                ...state,
                list,
                isLoading: false,
              }));
            },
          });
      }),

      create: signalMethod(async ({ data }: { data: Partial<ProdesModel> }) => {
        patchState(store, { isLoading: true });
        await new Promise((resolve) => setTimeout(resolve, 100));
        const id = await prodesService.create({ data: data as ProdesModel });
        patchState(store, (state) => ({
          ...state,
          list: [...state.list, { ...(data as ProdesModel), id }],
          isLoading: false,
        }));
      }),

      updateById: signalMethod(
        async ({ id, data }: { id: string; data: Partial<ProdesModel> }) => {
          patchState(store, { isLoading: true });
          await new Promise((resolve) => setTimeout(resolve, 100));
          await prodesService.updateById({ id, data: data as ProdesModel });
          patchState(store, (state) => ({
            ...state,
            list: state.list.map((f) => (f.id === id ? { ...f, ...data } : f)),
            isLoading: false,
          }));
        },
      ),

      deleteById: signalMethod(async ({ id }: { id: string }) => {
        patchState(store, { isLoading: true });
        await new Promise((resolve) => setTimeout(resolve, 100));
        await prodesService.deleteById({ id: id.toString() });
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
