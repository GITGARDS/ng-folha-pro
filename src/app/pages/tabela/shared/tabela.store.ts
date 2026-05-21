import { inject } from "@angular/core";
import { patchState, signalMethod, signalStore, withComputed, withHooks, withMethods, withProps, withState } from "@ngrx/signals";
import { MsgStore } from "../../../core/shared/store/msg.store";
import { EmpresaStore } from "../../empresa/shared/empresa.store";
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

  withProps(() => ({
    msgStore: inject(MsgStore),
    empresaStore: inject(EmpresaStore),
    tabelaService: inject(TabelaService),
  })),

  withComputed(() => ({})),

  withMethods(({ msgStore, tabelaService, ...store }) => ({
    carregaLista: signalMethod(() => {
      patchState(store, { isLoading: true });
      tabelaService.findAll({}).subscribe({
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
    create: signalMethod(({ data }: { data: Partial<TabelaModel> }) => {
      patchState(store, { isLoading: true });
      tabelaService.create({ data: data as TabelaModel }).subscribe({
        next: (id) => {
          patchState(store, (state) => ({
            ...state,
            list: [...state.list, { ...(data as TabelaModel), id }],
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

    updateById: signalMethod(({ id, data }: { id: string; data: Partial<TabelaModel> }) => {
      patchState(store, { isLoading: true });
      tabelaService.updateById({ id, data: data as TabelaModel }).subscribe({
        next: () => {
          patchState(store, (state) => ({
            ...state,
            list: state.list.map((f) => (f.id === id ? { ...f, ...(data as TabelaModel) } : f)),
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
      tabelaService.deleteById({ id: params.id.toString() }).subscribe({
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
