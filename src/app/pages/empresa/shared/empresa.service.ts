import { Injectable, signal } from "@angular/core";
import { collection } from "firebase/firestore";
import { db } from "../../../../firebase";
import { GenericsService } from "../../../shared/generics/generics.service";

@Injectable({
  providedIn: 'root',
})
export class EmpresaService<T> extends GenericsService<T> {
  idEmpresaLogada = signal<string | number | null>(null);
  constructor() {
    super('empresa', collection(db, 'empresa'), 500, 'nomeEmpresaRazaoSocial', 'asc');
  }

  async login({ id }: { id: string }) {
    this.idEmpresaLogada.set(id);
  }

  async logout() {
    this.idEmpresaLogada.set(null);
  }
}
