import { TableActionsModel, TableColumnsModel } from "../../../shared/models/tablecolumns.model";

export const TABELA_COLUMNS_ACTIONS: TableActionsModel[] = [
  {
    label: 'Editar',
    icon: 'edit',
    action: 'editar',
  },
  {
    label: 'Excluir',
    icon: 'delete',
    action: 'excluir'
  },
];

export const TABELA_DISPLAYED_COLUMNS: TableColumnsModel[] = [
  {
    label: 'Id',
    field: 'id',
    type: 'string',
    display: false,
  },
  {
    label: 'Referencia',
    field: 'referencia',
    type: 'string',
    display: true,
  },
  {
    label: 'Nome',
    field: 'nome',
    type: 'string',
    display: true,
  },
  {
    label: 'fgts',
    field: 'fgts',
    type: 'json',
    display: true,
  },
  {
    label: 'inss',
    field: 'inss',
    type: 'json',
    display: true,
  },
  {
    label: 'irrf',
    field: 'irrf',
    type: 'json',
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

export type TabelaModel = {
  id: string;
  referencia: number;
  nome: string;
  fgts: {
    clt_geral: number;
    jovem_aperndiz: number;
    domestico: number;
  };
  inss: ModelTabelaDed[];
  irrf: ModelTabelaDed[];
};

type ModelTabelaDed = {
  salarioContribuicao: number;
  aliquotaProgressiva: number;
  deducao: number;
};

export const MOCK_TABELAS: Partial<TabelaModel>[] = [
  {
    referencia: 1,
    nome: 'Tabela 1',
    fgts: {
      clt_geral: 0,
      jovem_aperndiz: 0,
      domestico: 0,
    },
    inss: [],
    irrf: [],
  },
];
