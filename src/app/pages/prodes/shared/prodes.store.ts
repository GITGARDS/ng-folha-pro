import { inject } from "@angular/core";
import { Router } from "@angular/router";
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

  withComputed((store) => ({})),

  withMethods(
    (store, prodesService = inject(ProdesService), router = inject(Router)) => ({
      carregaLista: signalMethod(async () => {
        if (store.list.length > 0) return;
        patchState(store, { isLoading: true });
        await prodesService.findAll().then((list) => {
          patchState(store, (state) => ({
            ...state,
            list,
            isLoading: false,
          }));
        });
      }),

      create: signalMethod(async (param: { data: Partial<ProdesModel> }) => {
        patchState(store, { isLoading: true });
        await prodesService.create(param.data as ProdesModel).then((list) => {
          patchState(store, (state) => ({
            ...state,
            list,
            isLoading: false,
          }));
        });
      }),

      updateById: signalMethod(async (params: { id: string; data: Partial<ProdesModel> }) => {
        patchState(store, { isLoading: true });
        await prodesService.updateById(params.id, params.data as ProdesModel).then((list) => {
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
        await prodesService.deleteById(id.toString()).then((list) => {
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
