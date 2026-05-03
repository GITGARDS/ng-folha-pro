import { computed, inject } from "@angular/core";
import { patchState, signalMethod, signalStore, withComputed, withHooks, withMethods, withState } from "@ngrx/signals";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { delay, pipe } from "rxjs";
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
    totalAtivos: computed(() => list().filter((f) => f.ativo === true)),
  })),

  withMethods(
    (
      store,
      departamentoService = inject(DepartamentoService),
    ) => ({
      teste: rxMethod<unknown>(pipe(delay(2000))),

      carregaLista: signalMethod(() => {
        if (store.list.length > 0) return;
        patchState(store, { isLoading: true });
        departamentoService
          .findAll({})
          .pipe(delay(200))
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

      create: signalMethod(async ({ data }: { data: Partial<DepartamentoModel> }) => {
        patchState(store, { isLoading: true });
        await new Promise((resolve) => setTimeout(resolve, 100));
        const id = await departamentoService.create({ data: data as DepartamentoModel });
        patchState(store, (state) => ({
          ...state,
          list: [...state.list, { ...(data as DepartamentoModel), id }],
          isLoading: false,
        }));
      }),

      updateById: signalMethod(
        async ({ id, data }: { id: string; data: Partial<DepartamentoModel> }) => {
          patchState(store, { isLoading: true });
          await new Promise((resolve) => setTimeout(resolve, 100));
          await departamentoService.updateById({ id, data: data as DepartamentoModel });
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
        await departamentoService.deleteById({ id: id.toString() });
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
