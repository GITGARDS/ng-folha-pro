import { computed, effect, inject } from "@angular/core";
import { patchState, signalMethod, signalStore, withComputed, withHooks, withMethods, withProps, withState } from "@ngrx/signals";
import { MsgService } from "../../../core/shared/services/msg.service";
import { EmpresaService } from "../../empresa/shared/empresa.service";
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
    msgService: inject(MsgService),
    empresaService: inject(EmpresaService),
    departamentoService: inject(DepartamentoService),
  })),

  withComputed(({ list }) => ({
    totalAtivos: computed(() => list().filter((f) => f.ativo === true)),
  })),

  withMethods(({ msgService, departamentoService, ...store }) => ({
    carregaLista: signalMethod(({ empresa }: { empresa: string }) => {
      patchState(store, { isLoading: true });
      departamentoService.findAll({ empresa: empresa }).subscribe({
        next: (list) => {
          patchState(store, (state) => ({
            ...state,
            list,
            isLoading: false,
          }));
          msgService.openSnackBar('Listagem carregada com sucesso');
        },
        error: (err) => {
          (patchState(store, { isLoading: false }),
            msgService.openSnackBar('Erro ao carregar listagem, ' + err.message));
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
          }));
          msgService.openSnackBar('Registro criado com sucesso');
        },
        error: (err) => {
          patchState(store, { isLoading: false });
          msgService.openSnackBar('Erro ao criar registro, ' + err.message);
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
          msgService.openSnackBar('Registro atualizado com sucesso');
        },
        error: (err) => {
          (patchState(store, { isLoading: false }),
            msgService.openSnackBar('Erro ao atualizar registro, ' + err.message));
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
          msgService.openSnackBar('Registro excluído com sucesso');
        },
        error: (err) => {
          patchState(store, { isLoading: false });
          msgService.openSnackBar('Erro ao excluir registro, ' + err.message);
        },
        complete: () => patchState(store, { isLoading: false }),
      });
    }),
  })),

  withHooks(({ empresaService, ...store }) => ({
    onInit() {
      effect(() => {
        store.carregaLista({ empresa: empresaService.empresaLogada()?.id as string });
      });
    },
  })),
);
