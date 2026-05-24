import { computed, effect, inject } from "@angular/core";
import { patchState, signalMethod, signalStore, withComputed, withHooks, withMethods, withProps, withState } from "@ngrx/signals";
import { AppService } from "../../../core/shared/services/app.service";
import { EmpresaStore } from "../../empresa/shared/empresa.store";
import { FuncionarioModel } from "./funcionario.model";
import { FuncionarioService } from "./funcionario.service";

type FuncionarioState = {
  list: FuncionarioModel[];
  isLoading: boolean;
  msg: string;
};

const initialState: FuncionarioState = {
  list: [],
  isLoading: false,
  msg: '',
};

export const FuncionarioStore = signalStore(
  {
    providedIn: 'root',
  },
  withState(initialState),

  withProps(() => ({
    empresaStore: inject(EmpresaStore),
    funcionarioService: inject(FuncionarioService),
    appService: inject(AppService),
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

  withMethods(({ funcionarioService, ...store }) => ({
    carregaLista: signalMethod(({ empresa }: { empresa: string }) => {
      patchState(store, { isLoading: true });
      funcionarioService.findAll({ empresa: empresa, collection: 'funcionarios' }).subscribe({
        next: (list) => {
          patchState(store, (state) => ({
            ...state,
            list,
            isLoading: false,
            msg: 'Registros carregados com sucesso',
          }));
        },
        error: (err) => {
          patchState(
            store,
            { msg: 'Erro ao carregar listagem, ' + err.message },
            { isLoading: false },
          );
        },

        complete: () => patchState(store, { isLoading: false }),
      });
    }),
    create: signalMethod(({ data }: { data: Partial<FuncionarioModel> }) => {
      patchState(store, { isLoading: true });
      funcionarioService.create({ data: data as FuncionarioModel }).subscribe({
        next: (id) => {
          patchState(store, (state) => ({
            ...state,
            list: [...state.list, { ...(data as FuncionarioModel), id }],
            isLoading: false,
            msg: 'Registro criado com sucesso',
          }));
        },
        error: (err) => {
          patchState(
            store,
            { isLoading: false },
            {
              msg: 'Erro ao criar registro, ' + err.message,
            },
          );
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
            msg: 'Registro atualizado com sucesso',
          }));
        },
        error: (err) => {
          patchState(
            store,
            { isLoading: false },
            { msg: 'Erro ao atualizar registro, ' + err.message },
          );
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
            msg: 'Registro excluído com sucesso',
          }));
        },
        error: (err) => {
          patchState(
            store,
            { isLoading: false },
            {
              msg: 'Erro ao excluir registro, ' + err.message,
            },
          );
        },
        complete: () => patchState(store, { isLoading: false }),
      });
    }),
  })),

  withHooks(({ appService, empresaStore, ...store }) => ({
    onInit() {
      effect(() => {
        if (empresaStore.empresaLogada() === null) {
          patchState(store, { list: [] });
        }
      });
      effect(() => {
        if (empresaStore.empresaLogada() !== null) {
          store.carregaLista({ empresa: empresaStore.empresaLogada()?.id as string });
        }
      });
      effect(() => {
        appService.openSnackBar(store.msg());
      });
    },
  })),
);
