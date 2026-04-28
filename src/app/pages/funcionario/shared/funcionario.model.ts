export type FuncionarioModel = {
  id: string;
  empresa: string;
  nome: string;
  cpf: string;
  dataNascimento: string;
  nomeMae: string;
  nacionalidade: string;
  naturalidade: string;
  genero: string;
  racaCor: string;
  estadoCivil: string;
  endereco: string;
  bairro: string;
  cidade: string;
  cep: string;
  telefone: string;
  celular: string;
  email: string;
  rg: string;
  ctpsDigital: string;
  pisPasep: string;
  tituloEleitor: string;
  certificadoReservista: string;
  dataAdmissao: string;
  categoriaTrabalhador: string;
  cargoFuncaoDesempenhada: string;
  salarioBase: number;
  jornadaTrabalho: string;
  departamentoCentroCusto: string;
  tipoContrato: string;
  vinculoSindicato: string;
  insalubridade: string;
  suporteTopPonto: string;
  tipoConta: string;
  banco: string;
  agencia: string;
  conta: string;
  valeTransporte: string;
  planoSaude: string;
  planoOdontologico: string;
  ativo: boolean;
  // ----------------------
  matricula: string;
  ctps: string;
  serieCtps: string;
  dataOpcao: string;
  cbo: string;
  classeDeContribuicao: string;
  ocorrencia: string;
};

export const MOCK_FUNCIONARIOS: FuncionarioModel[] = [
  {
    id: '1',
    empresa: 'empresa 1',
    nome: 'funcionario 1',
    cpf: '000.000.000-00',
    dataNascimento: '2000-01-01',
    nomeMae: 'mae 1',
    nacionalidade: 'nacionalidade 1',
    naturalidade: 'naturalidade 1',
    genero: 'genero 1',
    racaCor: 'racaCor 1',
    estadoCivil: 'estadoCivil 1',
    endereco: 'endereco 1',
    bairro: 'bairro 1',
    cidade: 'cidade 1',
    cep: 'cep 1',
    telefone: 'telefone 1',
    celular: 'celular 1',
    email: 'email 1',
    rg: 'rg 1',
    ctpsDigital: 'ctpsDigital 1',
    pisPasep: 'pisPasep 1',
    tituloEleitor: 'tituloEleitor 1',
    certificadoReservista: 'certificadoReservista 1',
    dataAdmissao: 'dataAdmissao 1',
    categoriaTrabalhador: 'categoriaTrabalhador 1',
    cargoFuncaoDesempenhada: 'cargoFuncaoDesempenhada 1',
    salarioBase: 1000,
    jornadaTrabalho: 'jornadaTrabalho 1',
    departamentoCentroCusto: 'departamentoCentroCusto 1',
    tipoContrato: 'tipoContrato 1',
    vinculoSindicato: 'vinculoSindicato 1',
    insalubridade: 'insalubridade 1',
    suporteTopPonto: 'suporteTopPonto 1',
    tipoConta: 'tipoConta 1',
    banco: 'banco 1',
    agencia: 'agencia 1',
    conta: 'conta 1',
    valeTransporte: 'valeTransporte 1',
    planoSaude: 'planoSaude 1',
    planoOdontologico: 'planoOdontologico 1',
    ativo: true,
    // ----------------------
    matricula: 'matricula 1',
    ctps: 'ctps 1',
    serieCtps: 'serieCtps 1',
    dataOpcao: 'dataOpcao 1',
    cbo: 'cbo 1',
    classeDeContribuicao: 'classeDeContribuicao 1',
    ocorrencia: 'ocorrencia 1',
  },
];
