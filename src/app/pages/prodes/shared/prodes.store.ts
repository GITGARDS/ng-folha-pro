import { computed, inject } from "@angular/core";
import { patchState, signalMethod, signalStore, withComputed, withHooks, withMethods, withProps, withState } from "@ngrx/signals";
import { MsgStore } from "../../../core/shared/store/msg.store";
import { EmpresaStore } from "../../empresa/shared/empresa.store";
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
    msgStore: inject(MsgStore),
    empresaStore: inject(EmpresaStore),
    prodesService: inject(ProdesService),
  })),

  withComputed(({ list }) => ({
    totalAtivos: computed(() => list().filter((f) => f.ativo === true)),
  })),

  withMethods(({ msgStore, prodesService, ...store }) => ({
    carregaLista: signalMethod(() => {
      patchState(store, { isLoading: true });
      prodesService.findAll({}).subscribe({
        next: (list) => {
          patchState(store, (state) => ({
            ...state,
            list,
            isLoading: false,
          }));
          msgStore.onMsg({ msg: 'Listagem carregada com sucesso' });
        },
        error: (err) => {
          (patchState(store, { isLoading: false }),
            msgStore.onMsg({
              msg: 'Erro ao carregar listagem, ' + err.message,
            }));
        },
        complete: () => patchState(store, { isLoading: false }),
      });
    }),
    resetList: signalMethod(() => {
      patchState(store, { isLoading: true });
      patchState(store, (state) => ({ ...state, list: [] }), { isLoading: false });
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
          msgStore.onMsg({ msg: 'Registro criado com sucesso' });
        },
        error: (err) => {
          patchState(store, { isLoading: false });
          msgStore.onMsg({ msg: 'Erro ao criar registro, ' + err.message });
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
          msgStore.onMsg({ msg: 'Registro atualizado com sucesso' });
        },
        error: (err) => {
          (patchState(store, { isLoading: false }),
            msgStore.onMsg({ msg: 'Erro ao atualizar registro, ' + err.message }));
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
          msgStore.onMsg({ msg: 'Registro excluído com sucesso' });
        },
        error: (err) => {
          patchState(store, { isLoading: false });
          msgStore.onMsg({ msg: 'Erro ao excluir registro, ' + err.message });
        },
        complete: () => patchState(store, { isLoading: false }),
      });
    }),
  })),

  withHooks(({ empresaStore, ...store }) => ({
    onInit() {
      store.carregaLista(null);
    },
  })),
);
