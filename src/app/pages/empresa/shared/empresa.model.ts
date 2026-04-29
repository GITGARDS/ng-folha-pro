export type EmpresaModel = {
  id: string;
  tipoInscricao: string;
  inscricao: string;
  inscricaoMunicipal: string;
  inscricaoEstadual: string;
  nomeEmpresaRazaoSocial: string;
  nomeFantasia: string;
  dataAbertura: string;
  email: string;
  logradouro: string;
  bairro: string;
  cep: string;
  cidade: string;
  uf: string;
  telefone: string;
  celular: string;
  cnae: string;
  aliquotaRat: string;
  codigoDeCentralizacao: string;
  simples: string;
  fpas: string;
  codigoDeOutrasEntidades: string;
  codigoDePagamentoGps: string;
};

export type EmpresaLogadaModel = {
  empresa: EmpresaModel;
  isLogada: boolean;
};

export const MOCK_EMPRESAS: EmpresaModel[] = [
  {
    id: '1',
    tipoInscricao: '1',
    inscricao: '1',
    inscricaoMunicipal: '1',
    inscricaoEstadual: '1',
    nomeEmpresaRazaoSocial: '1',
    nomeFantasia: '1',
    dataAbertura: '1',
    email: '1',
    logradouro: '1',
    bairro: '1',
    cep: '1',
    cidade: '1',
    uf: '1',
    telefone: '1',
    celular: '1',
    cnae: '1',
    aliquotaRat: '1',
    codigoDeCentralizacao: '1',
    simples: '1',
    fpas: '1',
    codigoDeOutrasEntidades: '1',
    codigoDePagamentoGps: '1',
  },
  {
    id: '2',
    tipoInscricao: '2',
    inscricao: '2',
    inscricaoMunicipal: '2',
    inscricaoEstadual: '2',
    nomeEmpresaRazaoSocial: '2',
    nomeFantasia: '2',
    dataAbertura: '2',
    email: '2',
    logradouro: '2',
    bairro: '2',
    cep: '2',
    cidade: '2',
    uf: '2',
    telefone: '2',
    celular: '2',
    cnae: '2',
    aliquotaRat: '2',
    codigoDeCentralizacao: '2',
    simples: '2',
    fpas: '2',
    codigoDeOutrasEntidades: '2',
    codigoDePagamentoGps: '2',
  },
  {
    id: '3',
    tipoInscricao: '3',
    inscricao: '3',
    inscricaoMunicipal: '3',
    inscricaoEstadual: '3',
    nomeEmpresaRazaoSocial: '3',
    nomeFantasia: '3',
    dataAbertura: '3',
    email: '3',
    logradouro: '3',
    bairro: '3',
    cep: '3',
    cidade: '3',
    uf: '3',
    telefone: '3',
    celular: '3',
    cnae: '3',
    aliquotaRat: '3',
    codigoDeCentralizacao: '3',
    simples: '3',
    fpas: '3',
    codigoDeOutrasEntidades: '3',
    codigoDePagamentoGps: '3',
  },
];
