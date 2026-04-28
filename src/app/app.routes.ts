import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./core/dashboard/dashboard'),
  },
  {
    path: 'departamento',
    loadComponent: () => import('./pages/departamento/departamento'),
  },
  {
    path: 'empresa',
    loadComponent: () => import('./pages/empresa/empresa'),
  },
  {
    path: 'funcionario',
    loadComponent: () => import('./pages/funcionario/funcionario'),
  },
  {
    path: 'prodes',
    loadComponent: () => import('./pages/prodes/prodes'),
  },
  {
    path: 'tabela',
    loadComponent: () => import('./pages/tabela/tabela'),
  },
];
