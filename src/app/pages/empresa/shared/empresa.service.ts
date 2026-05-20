import { Injectable, signal } from "@angular/core";
import { TIME_DELAY } from "../../../core/shared/consts";
import { IService } from "../../../core/shared/generics/i.service";
import { EmpresaModel } from "./empresa.model";

@Injectable({
  providedIn: 'root',
})
export class EmpresaService<T> extends IService<T> {
  idEmpresaLogada = signal<string | number | null>(null);
  constructor() {
    // super('empresa', TIME_DELAY);
    super('empresa', 'nomeEmpresaRazaoSocial', 'asc', TIME_DELAY);
  }

  async login({ empresa }: { empresa: EmpresaModel }) {
    this.idEmpresaLogada.set(empresa.id);
  }

  async logout() {
    this.idEmpresaLogada.set(null);
  }
}
