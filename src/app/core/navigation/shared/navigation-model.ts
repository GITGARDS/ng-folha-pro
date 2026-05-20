export type NavigationModel = {
  label: string;
  icon: string;
  url: string;
};

export const DASHBOARD: NavigationModel = {
  label: 'Dashboard',
  icon: 'dashboard',
  url: '/dashboard',
};

export const EMPRESA: NavigationModel = {
  label: 'Empresa',
  icon: 'business',
  url: '/empresa',
};

export const FUNCIONARIO: NavigationModel = {
  label: 'Funcionario',
  icon: 'person',
  url: '/funcionario',
};

export const DEPARTAMENTO: NavigationModel = {
  label: 'Departamento',
  icon: 'work',
  url: '/departamento',
};

export const PRODES: NavigationModel = {
  label: 'Provento/Desconto',
  icon: 'attach_money',
  url: '/prodes',
};

export const TABELA: NavigationModel = {
  label: 'Tabela',
  icon: 'table_chart',
  url: '/tabela',
};

export const NAVIGATION_LIST: NavigationModel[] = [
  DASHBOARD,
  EMPRESA,
  DEPARTAMENTO,
  FUNCIONARIO,
  PRODES,
  TABELA,
];
