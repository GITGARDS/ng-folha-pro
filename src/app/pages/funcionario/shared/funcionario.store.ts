import { computed, effect, inject } from "@angular/core";
import { patchState, signalMethod, signalStore, withComputed, withHooks, withMethods, withState } from "@ngrx/signals";
import { TIME_DELAY } from "../../../core/shared/consts";
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
      patchState(store, { isLoading: true });
      funcionarioService.findAll({ empresa: empresa }).subscribe({
        next: (list) => {
          patchState(store, (state) => ({
            ...state,
            list,
            isLoading: false,
          }));
        },
        error: () => patchState(store, { isLoading: false }),
        complete: () => patchState(store, { isLoading: false }),
      });
    }),
    carregaListaVazia: signalMethod(async () => {
      await new Promise((resolve) => setTimeout(resolve, TIME_DELAY));
      patchState(store, (state) => ({
        ...state,
        list: [],
      }));
    }),

    create: signalMethod(async ({ data }: { data: Partial<FuncionarioModel> }) => {
      patchState(store, { isLoading: true });
      funcionarioService.create({ data: data as FuncionarioModel }).subscribe({
        next: (id) => {
          patchState(store, (state) => ({
            ...state,
            list: [...state.list, { ...(data as FuncionarioModel), id }],
            isLoading: false,
          }));
        },
        error: () => patchState(store, { isLoading: false }),
        complete: () => patchState(store, { isLoading: false }),
      });
    }),

    updateById: signalMethod(
      async ({ id, data }: { id: string; data: Partial<FuncionarioModel> }) => {
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
          },
          error: () => patchState(store, { isLoading: false }),
          complete: () => patchState(store, { isLoading: false }),
        });
      },
    ),

    deleteById: signalMethod(async (params: { id: string }) => {
      patchState(store, { isLoading: true });
      funcionarioService.deleteById({ id: params.id.toString() }).subscribe({
        next: () => {
          patchState(store, (state) => ({
            ...state,
            list: state.list.filter((f) => f.id !== params.id.toString()),
            isLoading: false,
          }));
        },
        error: () => patchState(store, { isLoading: false }),
        complete: () => patchState(store, { isLoading: false }),
      });
    }),
  })),

  withHooks((store, empresaService = inject(EmpresaService)) => ({
    onInit() {
      effect(() => {
        store.carregaLista({ empresa: empresaService.idEmpresaLogada() as string });
      });
    },
  })),
);
