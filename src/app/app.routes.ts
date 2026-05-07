import { Routes } from "@angular/router";
import { empresaGuard } from "./pages/empresa/shared/empresa-guard";

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
    canActivate: [empresaGuard],
    loadComponent: () => import('./pages/departamento/departamento'),
  },
  {
    path: 'empresa',
    loadComponent: () => import('./pages/empresa/empresa'),
  },
  {
    path: 'funcionario',
    canActivate: [empresaGuard],
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
