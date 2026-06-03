import { inject } from "@angular/core";
import { CanActivateFn } from "@angular/router";
import { EmpresaStore } from "./empresa.store";

export const empresaGuard: CanActivateFn = (route, state) => {
  const empresaStore = inject(EmpresaStore);

  if (empresaStore.empresaLogada() === null) {
    alert('Você precisa estar logado para acessar essa página');
    return false;    
  }
  return true;
};
