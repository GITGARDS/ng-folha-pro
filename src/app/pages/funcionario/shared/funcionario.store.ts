import { computed, inject } from "@angular/core";
import { patchState, signalMethod, signalStore, withComputed, withHooks, withMethods, withState } from "@ngrx/signals";
import { EmpresaService } from "../../empresa/shared/empresa.service";
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

  withComputed(({ list }) => ({
    totalAtivos: computed(() => list().filter((f) => f.ativo === true)),
    totalSalarioBase: computed(() =>
      list().reduce(
        (acc, f) => (f.salarioBase && f.ativo ? acc + Number(f.salarioBase) : acc + 0),
        0,
      ),
    ),
  })),

  withMethods((store, funcionarioService = inject(FuncionarioService)) => ({
    carregaLista: signalMethod(({ empresa }: { empresa: string }) => {
      if (store.list.length > 0) return;
      patchState(store, { isLoading: true });
      funcionarioService.findAll({ empresa }).subscribe({
        next: (list) => {
          patchState(store, (state) => ({
            ...state,
            list,
            isLoading: false,
          }));
        },
      });
    }),
    carregaListaVazia: signalMethod(async () => {
      await new Promise((resolve) => setTimeout(resolve, 100));
      patchState(store, (state) => ({
        ...state,
        list: [],
      }));
    }),

    create: signalMethod(async ({ data }: { data: Partial<FuncionarioModel> }) => {
      patchState(store, { isLoading: true });
      await new Promise((resolve) => setTimeout(resolve, 100));
      const id = await funcionarioService.create({ data: data as FuncionarioModel });
      patchState(store, (state) => ({
        ...state,
        list: [...state.list, { ...(data as FuncionarioModel), id }],
        isLoading: false,
      }));
    }),

    updateById: signalMethod(
      async ({ id, data }: { id: string; data: Partial<FuncionarioModel> }) => {
        patchState(store, { isLoading: true });
        await new Promise((resolve) => setTimeout(resolve, 100));
        await funcionarioService.updateById({ id, data: data as FuncionarioModel });
        patchState(store, (state) => ({
          ...state,
          list: state.list.map((f) => (f.id === id ? { ...f, ...(data as FuncionarioModel) } : f)),
          isLoading: false,
        }));
      },
    ),

    deleteById: signalMethod(async ({ id }: { id: string }) => {
      patchState(store, { isLoading: true });
      await new Promise((resolve) => setTimeout(resolve, 100));
      await funcionarioService.deleteById({ id: id.toString() });
      patchState(store, (state) => ({
        ...state,
        list: state.list.filter((f) => f.id !== id.toString()),
        isLoading: false,
      }));
    }),
  })),
  withHooks((store, empresaService = inject(EmpresaService)) => ({
    onInit() {
      store.carregaLista({ empresa: empresaService.idEmpresaLogada() as string });
    },
  })),
);
