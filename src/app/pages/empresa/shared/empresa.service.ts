import { Injectable } from "@angular/core";
import { TIME_DELAY } from "../../../core/shared/consts";
import { IService } from "../../../core/shared/generics/i.service";
import { EmpresaModel } from "./empresa.model";

@Injectable({
  providedIn: 'root',
})
export class EmpresaService<T> extends IService<T> {
  constructor() {
    super('empresa', 'nomeEmpresaRazaoSocial', 'asc', TIME_DELAY);
  }

  login({empresa}: {empresa: EmpresaModel}): void {
    localStorage.setItem('empresa', JSON.stringify(empresa));    
  }
  logout(): void {
    localStorage.removeItem('empresa');
  }

  getEmpresa(): EmpresaModel | null {
    const empresaData = localStorage.getItem('empresa');
    return empresaData ? JSON.parse(empresaData) : null;
  }
}
