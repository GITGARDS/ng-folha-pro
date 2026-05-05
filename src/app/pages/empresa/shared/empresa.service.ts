import { Injectable, signal } from "@angular/core";
import { collection } from "firebase/firestore";
import { db } from "../../../../firebase";
import { GenericsService } from "../../../shared/generics/generics.service";
import { EmpresaModel } from "./empresa.model";

@Injectable({
  providedIn: 'root',
})
export class EmpresaService<T> extends GenericsService<T> {
  idEmpresaLogada = signal<string | number | null>(null);
  constructor() {
    super('empresa', collection(db, 'empresa'), 50, 'nomeEmpresaRazaoSocial', 'asc');
  }

  async login({ empresa }: { empresa: EmpresaModel }) {
    console.log('login empresa', empresa.id);
    this.idEmpresaLogada.set(empresa.id);
  }

  async logout() {
    this.idEmpresaLogada.set(null);
  }
}
