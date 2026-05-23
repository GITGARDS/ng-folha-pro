import { TableActionsModel, TableColumnsModel } from "../../../core/shared/models/tablecolumns.model";

export const DEPARTAMENTO_COLUMNS_ACTIONS: TableActionsModel[] = [
  {
    label: 'Editar',
    icon: 'edit',
    action: 'editar',
  },
  {
    label: 'Excluir',
    icon: 'delete',
    action: 'excluir',
  },
];

export const DEPARTAMENTO_DISPLAYED_COLUMNS: TableColumnsModel[] = [
  {
    label: 'Id',
    field: 'id',
    type: 'string',
    display: true,
  },
  {
    label: 'Empresa',
    field: 'empresa',
    type: 'string',
    display: false,
  },
  {
    label: 'Nome',
    field: 'nome',
    type: 'string',
    display: true,
  },
  {
    label: 'Ativo',
    field: 'ativo',
    type: 'boolean',
    display: true,
  },
  {
    label: 'Actions',
    field: 'actions',
    type: 'any',
    display: true,
  },
];

export interface DepartamentoModel {
  id: string;
  empresa: string;
  nome: string;
  ativo: boolean;
};

export const DEPARTAMENTO_MODEL_EMPTY: DepartamentoModel = {
  id: '',
  empresa: '',
  nome: '',
  ativo: true,
};

export const MOCK_DEPARTAMENTOS: DepartamentoModel[] = [
  { id: '1', empresa: '1', nome: 'TI', ativo: true },
  { id: '2', empresa: '1', nome: 'RH', ativo: true },
  { id: '3', empresa: '1', nome: 'Vendas', ativo: true },
  { id: '4', empresa: '1', nome: 'Comercial', ativo: true },
  { id: '5', empresa: '1', nome: 'Logística', ativo: true },
  { id: '6', empresa: '1', nome: 'Administração', ativo: true },
];
