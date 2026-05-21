import { computed, effect, inject } from "@angular/core";
import { patchState, signalMethod, signalStore, withComputed, withHooks, withMethods, withProps, withState } from "@ngrx/signals";
import { MsgStore } from "../../../core/shared/store/msg.store";
import { EmpresaStore } from "../../empresa/shared/empresa.store";
import { FuncionarioModel } from "./funcionario.model";
import { FuncionarioService } from "./funcionario.service";

type FuncionarioState = {
  list: FuncionarioModel[];
  isLoading: boolean;
};

const initialState: FuncionarioState = {
  list: [],
  isLoading: false,
};

export const FuncionarioStore = signalStore(
  {
    providedIn: 'root',
  },
  withState(initialState),

  withProps(() => ({
    msgStore: inject(MsgStore),
    empresaStore: inject(EmpresaStore),
    funcionarioService: inject(FuncionarioService),
  })),

  withComputed(({ list }) => ({
    totalAtivos: computed(() => list().filter((f) => f.ativo === true)),
    totalSalarioBase: computed(() =>
      list().reduce(
        (acc, f) => (f.salarioBase && f.ativo ? acc + Number(f.salarioBase) : acc + 0),
        0,
      ),
    ),
  })),

  withMethods(({ msgStore, funcionarioService, ...store }) => ({
    carregaLista: signalMethod(({ empresa }: { empresa: string }) => {
      patchState(store, { isLoading: true });
      funcionarioService.findAll({ empresa: empresa }).subscribe({
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
    create: signalMethod(({ data }: { data: Partial<FuncionarioModel> }) => {
      patchState(store, { isLoading: true });
      funcionarioService.create({ data: data as FuncionarioModel }).subscribe({
        next: (id) => {
          patchState(store, (state) => ({
            ...state,
            list: [...state.list, { ...(data as FuncionarioModel), id }],
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

    updateById: signalMethod(({ id, data }: { id: string; data: Partial<FuncionarioModel> }) => {
      patchState(store, { isLoading: true });
      funcionarioService.updateById({ id, data: data as FuncionarioModel }).subscribe({
        next: () => {
          patchState(store, (state) => ({
            ...state,
            list: state.list.map((f) =>
              f.id === id ? { ...f, ...(data as FuncionarioModel) } : f,
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
      funcionarioService.deleteById({ id: params.id.toString() }).subscribe({
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
