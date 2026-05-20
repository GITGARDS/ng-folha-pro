import { computed, effect, inject } from "@angular/core";
import { patchState, signalMethod, signalStore, withComputed, withHooks, withMethods, withProps, withState } from "@ngrx/signals";
import { TIME_DELAY } from "../../../core/shared/consts";
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
    empresaService: inject(EmpresaService),
    departamentoService: inject(DepartamentoService),
  })),

  withComputed(({ list }) => ({
    totalAtivos: computed(() => list().filter((f) => f.ativo === true)),
  })),

  withMethods(({ departamentoService, ...store }) => ({
    carregaLista: signalMethod(({ empresa }: { empresa: string }) => {
      patchState(store, { isLoading: true });
      departamentoService.findAll({ empresa: empresa }).subscribe({
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

    create: signalMethod(async ({ data }: { data: Partial<DepartamentoModel> }) => {
      patchState(store, { isLoading: true });
      departamentoService.create({ data: data as DepartamentoModel }).subscribe({
        next: (id) => {
          patchState(store, (state) => ({
            ...state,
            list: [...state.list, { ...(data as DepartamentoModel), id }],
            isLoading: false,
          }));
        },
        error: () => patchState(store, { isLoading: false }),
        complete: () => patchState(store, { isLoading: false }),
      });
    }),

    updateById: signalMethod(
      async ({ id, data }: { id: string; data: Partial<DepartamentoModel> }) => {
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
          },
          error: () => patchState(store, { isLoading: false }),
          complete: () => patchState(store, { isLoading: false }),
        });
      },
    ),

    deleteById: signalMethod(async (params: { id: string }) => {
      patchState(store, { isLoading: true });
      departamentoService.deleteById({ id: params.id.toString() }).subscribe({
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

  withHooks(({ empresaService, ...store }) => ({
    onInit() {
      effect(() => {
        store.carregaLista({ empresa: empresaService.idEmpresaLogada() as string });
      });
    },
  })),
);
