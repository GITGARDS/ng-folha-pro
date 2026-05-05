import { Injectable } from "@angular/core";
import { collection } from "firebase/firestore";
import { db } from "../../../../firebase";
import { GenericsService } from "../../../shared/generics/generics.service";
import { DepartamentoModel } from "./departamento.model";

@Injectable({
  providedIn: 'root',
})
export class DepartamentoService<T> extends GenericsService<DepartamentoModel> {
  constructor() {
    super('departamento', collection(db, 'departamento'), 50, 'nome', 'asc');
  }
}
