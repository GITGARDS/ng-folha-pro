import { computed, inject } from "@angular/core";
import { patchState, signalMethod, signalStore, withComputed, withHooks, withMethods, withState } from "@ngrx/signals";
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
    carregaLista: signalMethod((params: { empresa: string }) => {
      if (store.list.length > 0) return;
      patchState(store, { isLoading: true });
      funcionarioService.findAll({ empresa: params.empresa }).subscribe({
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

    create: signalMethod(async (params: { data: Partial<FuncionarioModel> }) => {
      patchState(store, { isLoading: true });
      await new Promise((resolve) => setTimeout(resolve, 100));
      const id = await funcionarioService.create(params.data as FuncionarioModel);
      patchState(store, (state) => ({
        ...state,
        list: [...state.list, { ...(params.data as FuncionarioModel), id }],
        isLoading: false,
      }));
    }),

    updateById: signalMethod(async (params: { id: string; data: Partial<FuncionarioModel> }) => {
      patchState(store, { isLoading: true });
      await new Promise((resolve) => setTimeout(resolve, 100));
      await funcionarioService.updateById(params.id, params.data as FuncionarioModel);
      patchState(store, (state) => ({
        ...state,
        list: state.list.map((f) =>
          f.id === params.id ? { ...f, ...(params.data as FuncionarioModel) } : f,
        ),
        isLoading: false,
      }));
    }),

    deleteById: signalMethod(async (params: { id: string }) => {
      patchState(store, { isLoading: true });
      await new Promise((resolve) => setTimeout(resolve, 100));
      await funcionarioService.deleteById(params.id.toString());
      patchState(store, (state) => ({
        ...state,
        list: state.list.filter((f) => f.id !== params.id.toString()),
        isLoading: false,
      }));
    }),
  })),
  withHooks((store) => ({
    onInit() {
      store.carregaLista({ empresa: '1' });
    },
  })),
);
