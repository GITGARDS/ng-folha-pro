export type TabelaModel = {
  id: string;
  nome: string;
  ativo: boolean;
};

export const MOCK_TABELAS: TabelaModel[] = [
  { id: '1', nome: 'TI', ativo: true },
  { id: '2', nome: 'RH', ativo: true },
  { id: '3', nome: 'Vendas', ativo: true },
  { id: '4', nome: 'Comercial', ativo: false },
  { id: '5', nome: 'Logística', ativo: true },
  { id: '6', nome: 'Administração', ativo: true },
];
