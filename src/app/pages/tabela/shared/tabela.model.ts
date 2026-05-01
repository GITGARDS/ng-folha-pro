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
