import { effect, inject } from "@angular/core";
import { patchState, signalMethod, signalStore, withComputed, withHooks, withMethods, withState } from "@ngrx/signals";
import { delay } from "rxjs";
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

  withComputed(({ list }) => ({
  })),

  withMethods((store, departamentoService = inject(DepartamentoService)) => ({
    carregaLista: signalMethod(({ empresa }: { empresa: string }) => {
      if (store.list.length > 0) return;
      patchState(store, { isLoading: true });
      departamentoService
        .findAll({ empresa: empresa })
        .pipe(delay(TIME_DELAY))
        .subscribe({
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
      await new Promise((resolve) => setTimeout(resolve, TIME_DELAY));
      patchState(store, (state) => ({
        ...state,
        list: [],
      }));
    }),

    create: signalMethod(async ({ data }: { data: Partial<DepartamentoModel> }) => {
      patchState(store, { isLoading: true });
      await new Promise((resolve) => setTimeout(resolve, TIME_DELAY));
      const id = await departamentoService.create({ data: data as DepartamentoModel });
      patchState(store, (state) => ({
        ...state,
        list: [...state.list, { ...(data as DepartamentoModel), id }],
        isLoading: false,
      }));
    }),

    updateById: signalMethod(
      async ({ id, data }: { id: string; data: Partial<DepartamentoModel> }) => {
        patchState(store, { isLoading: true });
        await new Promise((resolve) => setTimeout(resolve, TIME_DELAY));
        await departamentoService.updateById({ id, data: data as DepartamentoModel });
        patchState(store, (state) => ({
          ...state,
          list: state.list.map((f) => (f.id === id ? { ...f, ...(data as DepartamentoModel) } : f)),
          isLoading: false,
        }));
      },
    ),

    deleteById: signalMethod(async ({ id }: { id: string }) => {
      patchState(store, { isLoading: true });
      await new Promise((resolve) => setTimeout(resolve, TIME_DELAY));
      await departamentoService.deleteById({ id: id.toString() });
      patchState(store, (state) => ({
        ...state,
        list: state.list.filter((f) => f.id !== id.toString()),
        isLoading: false,
      }));
    }),
  })),
  withHooks((store, empresaService = inject(EmpresaService)) => ({
    onInit() {
      effect(() => {
        (store.carregaLista({ empresa: empresaService.idEmpresaLogada() as string }),
          {
            allowSignalWrites: true,
          });
      });
    },
  })),
);
