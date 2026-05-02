import { TableActionsModel, TableColumnsModel } from "../../../shared/models/tablecolumns.model";

export const DEPARTAMENTO_COLUMNS_ACTIONS: TableActionsModel[] = [
  {
    label: 'Editar',
    icon: 'edit',
  },
  {
    label: 'Excluir',
    icon: 'delete',
  },
];

export const DEPARTAMENTO_DISPLAYED_COLUMNS: TableColumnsModel[] = [
  {
    label: 'Id',
    field: 'id',
    type: 'string',
    display: true
  },
  {
    label: 'Nome',
    field: 'nome',
    type: 'string',
    display: true
  },
  {
    label: 'Ativo',
    field: 'ativo',
    type: 'boolean',
    display: true
  },
  {
    label: 'Actions',
    field: 'actions',
    type: 'any',
    display: true
  },

];

export type DepartamentoModel = {
  id: string;
  nome: string;
  ativo: boolean;
};

export const MOCK_DEPARTAMENTOS: DepartamentoModel[] = [
  { id: '1', nome: 'TI', ativo: true },
  { id: '2', nome: 'RH', ativo: true },
  { id: '3', nome: 'Vendas', ativo: true },
  { id: '4', nome: 'Comercial', ativo: true },
  { id: '5', nome: 'Logística', ativo: true },
  { id: '6', nome: 'Administração', ativo: true },
];
