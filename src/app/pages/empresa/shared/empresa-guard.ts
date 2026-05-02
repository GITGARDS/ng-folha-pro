import { inject } from "@angular/core";
import { CanActivateFn } from "@angular/router";
import { EmpresaService } from "./empresa.service";

export const empresaGuard: CanActivateFn = (route, state) => {
  const empresaService = inject(EmpresaService);

  if (!empresaService.idEmpresaLogada()) {
    alert('Você precisa estar logado para acessar essa página');
    return false;    
  }
  return true;
};
