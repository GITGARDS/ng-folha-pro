import { computed, effect, inject } from "@angular/core";
import { patchState, signalMethod, signalStore, withComputed, withHooks, withMethods, withProps, withState } from "@ngrx/signals";
import { MsgStore } from "../../../core/shared/store/msg.store";
import { EmpresaStore } from "../../empresa/shared/empresa.store";
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

  withProps(() => ({
    msgStore: inject(MsgStore),
    empresaStore: inject(EmpresaStore),
    departamentoService: inject(DepartamentoService),
  })),

  withComputed(({ list }) => ({
    totalAtivos: computed(() => list().filter((f) => f.ativo === true)),
  })),

  withMethods(({ msgStore, departamentoService, ...store }) => ({
    carregaLista: signalMethod(({ empresa }: { empresa: string }) => {
      patchState(store, { isLoading: true });
      departamentoService.findAll({ empresa: empresa }).subscribe({
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
    create: signalMethod(({ data }: { data: Partial<DepartamentoModel> }) => {
      patchState(store, { isLoading: true });
      departamentoService.create({ data: data as DepartamentoModel }).subscribe({
        next: (id) => {
          patchState(store, (state) => ({
            ...state,
            list: [...state.list, { ...(data as DepartamentoModel), id }],
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

    updateById: signalMethod(({ id, data }: { id: string; data: Partial<DepartamentoModel> }) => {
      patchState(store, { isLoading: true });
      departamentoService.updateById({ id, data: data as DepartamentoModel }).subscribe({
        next: () => {
          patchState(store, (state) => ({
            ...state,
            list: state.list.map((f) =>
              f.id === id ? { ...f, ...(data as DepartamentoModel) } : f,
            ),
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
      departamentoService.deleteById({ id: params.id.toString() }).subscribe({
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
      effect(() => {
        if (empresaStore.empresaLogada() === null) {
          store.resetList(null);
          return;
        }
        store.carregaLista({ empresa: empresaStore.empresaLogada()?.id as string });
      });
    },
  })),
);
