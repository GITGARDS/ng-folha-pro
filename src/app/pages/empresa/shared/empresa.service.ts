import { Injectable, signal } from "@angular/core";
import { TIME_DELAY } from "../../../core/shared/consts";
import { IService } from "../../../core/shared/generics/i.service";
import { EmpresaModel } from "./empresa.model";

@Injectable({
  providedIn: 'root',
})
export class EmpresaService<T> extends IService<T> {
  empresaLogada = signal<EmpresaModel | null>(null);

  constructor() {
    super('empresa', 'nomeEmpresaRazaoSocial', 'asc', TIME_DELAY);
  }

  async login({ empresa }: { empresa: EmpresaModel }) {
    this.empresaLogada.set(empresa);
  }

  async logout() {
    this.empresaLogada.set(null);
  }
}