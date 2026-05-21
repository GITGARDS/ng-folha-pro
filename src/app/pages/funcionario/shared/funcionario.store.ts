import { computed, effect, inject } from "@angular/core";
import { patchState, signalMethod, signalStore, withComputed, withHooks, withMethods, withProps, withState } from "@ngrx/signals";
import { addEntity, withEntities } from "@ngrx/signals/entities";
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
  withEntities<FuncionarioModel>(),

  withState(initialState),

  withProps(() => ({
    empresaService: inject(EmpresaService),
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

  withMethods(({ funcionarioService, ...store }) => ({
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

    setList: signalMethod(() => {
      patchState(store, { list: [] });
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
        },
        error: () => patchState(store, { isLoading: false }),
        complete: () => patchState(store, { isLoading: false }),
      });
    }),

    create2: signalMethod(({ data }: { data: Partial<FuncionarioModel> }) => {
      patchState(store, { isLoading: true });

      const newId = crypto.randomUUID();
      data.id = newId;
      addEntity(data as FuncionarioModel);

      patchState(store, (state) => ({
        ...state,
        list: [...state.list, data as FuncionarioModel],
        isLoading: false,
      }));
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
        },
        error: () => patchState(store, { isLoading: false }),
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
        },
        error: () => patchState(store, { isLoading: false }),
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
