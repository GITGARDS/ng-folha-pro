import { computed, inject } from "@angular/core";
import { patchState, signalMethod, signalStore, withComputed, withHooks, withMethods, withProps, withState } from "@ngrx/signals";
import { MsgService } from "../../../core/shared/services/msg.service";
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

  withProps(() => ({
    prodesService: inject(ProdesService),
    msgService: inject(MsgService),
  })),

  withComputed(({ list }) => ({
    totalAtivos: computed(() => list().filter((f) => f.ativo === true)),
  })),

  withMethods(({ msgService, prodesService, ...store }) => ({
    carregaLista: signalMethod(() => {
      patchState(store, { isLoading: true });
      prodesService.findAll({}).subscribe({
        next: (list) => {
          patchState(store, (state) => ({
            ...state,
            list: list,
            isLoading: false,
          }));
          msgService.openSnackBar('Registros carregados com sucesso');
        },
        error: (err) => {
          (patchState(store, { isLoading: false }),
            msgService.openSnackBar('Erro ao carregar registros, ' + err.message));
        },
        complete: () => patchState(store, { isLoading: false }),
      });
    }),

    create: signalMethod(({ data }: { data: Partial<ProdesModel> }) => {
      patchState(store, { isLoading: true });
      prodesService.create({ data: data as ProdesModel }).subscribe({
        next: (id) => {
          patchState(store, (state) => ({
            ...state,
            list: [...state.list, { ...(data as ProdesModel), id }],
            isLoading: false,
          }));
          msgService.openSnackBar('Registro criado com sucesso');
        },
        error: (err) => {
          (patchState(store, { isLoading: false }),
            msgService.openSnackBar('Erro ao criar registro, ' + err.message));
        },
        complete: () => patchState(store, { isLoading: false }),
      });
    }),

    updateById: signalMethod(({ id, data }: { id: string; data: Partial<ProdesModel> }) => {
      patchState(store, { isLoading: true });
      prodesService.updateById({ id, data: data as ProdesModel }).subscribe({
        next: () => {
          patchState(store, (state) => ({
            ...state,
            list: state.list.map((f) => (f.id === id ? { ...f, ...(data as ProdesModel) } : f)),
            isLoading: false,
          }));
          msgService.openSnackBar('Registro alterado com sucesso');
        },
        error: (err) => {
          (patchState(store, { isLoading: false }),
            msgService.openSnackBar('Erro ao alterar registro, ' + err.message));
        },
        complete: () => patchState(store, { isLoading: false }),
      });
    }),

    deleteById: signalMethod((params: { id: string }) => {
      patchState(store, { isLoading: true });
      prodesService.deleteById({ id: params.id.toString() }).subscribe({
        next: () => {
          patchState(store, (state) => ({
            ...state,
            list: state.list.filter((f) => f.id !== params.id.toString()),
            isLoading: false,
          }));
          msgService.openSnackBar('Registro excluído com sucesso');
        },
        error: (err) => {
          (patchState(store, { isLoading: false }),
            msgService.openSnackBar('Erro ao excluir registro, ' + err.message));
        },
        complete: () => patchState(store, { isLoading: false }),
      });
    }),
  })),
  withHooks(({ ...store }) => ({
    onInit() {
      store.carregaLista(null);
    },
  })),
);
