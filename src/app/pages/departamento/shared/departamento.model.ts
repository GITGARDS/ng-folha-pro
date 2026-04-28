export type DepartamentoModel = {
  id: string;
  nome: string;
};

export const MOCK_DEPARTAMENTOS: DepartamentoModel[] = [
  { id: '1', nome: 'TI' },
  { id: '2', nome: 'RH' },
  { id: '3', nome: 'Vendas' },
  { id: '4', nome: 'Comercial' },
  { id: '5', nome: 'Logística' },
  { id: '6', nome: 'Administração' },
];
