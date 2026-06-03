import { computed, effect, inject } from "@angular/core";
import { patchState, signalMethod, signalStore, withComputed, withHooks, withMethods, withProps, withState } from "@ngrx/signals";
import { AppService } from "../../../core/shared/services/app.service";
import { EmpresaStore } from "../../empresa/shared/empresa.store";
import { DepartamentoModel } from "./departamento.model";
import { DepartamentoService } from "./departamento.service";

type DepartamentoState = {
  list: DepartamentoModel[];
  isLoading: boolean;
  msg: string;
};

const initialState: DepartamentoState = {
  list: [],
  isLoading: false,
  msg: '',
};

export const DepartamentoStore = signalStore(
  {
    providedIn: 'root',
  },
  withState(initialState),

  withProps(() => ({
    empresaStore: inject(EmpresaStore),
    departamentoService: inject(DepartamentoService),
    appService: inject(AppService),
  })),

  withComputed(({ list }) => ({
    totalAtivos: computed(() => list().filter((f) => f.ativo === true)),
  })),

  withMethods(({ departamentoService, ...store }) => ({
    carregaLista: signalMethod(({ empresa }: { empresa: string }) => {
      patchState(store, { isLoading: true });
      departamentoService.findAll({ empresa: empresa, collection: 'departamento' }).subscribe({
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
    create: signalMethod(({ data }: { data: Partial<DepartamentoModel> }) => {
      patchState(store, { isLoading: true });
      departamentoService.create({ data: data as DepartamentoModel }).subscribe({
        next: (id) => {
          patchState(store, (state) => ({
            ...state,
            list: [...state.list, { ...(data as DepartamentoModel), id }],
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
      departamentoService.deleteById({ id: params.id.toString() }).subscribe({
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
