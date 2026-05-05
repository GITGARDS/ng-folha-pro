import { Injectable } from "@angular/core";
import { collection } from "firebase/firestore";
import { db } from "../../../../firebase";
import { TIMES } from "../../../core/shared/consts/app.consts";
import { IService } from "../../../core/shared/generics/i.service";
import { DepartamentoModel } from "./departamento.model";

@Injectable({
  providedIn: 'root',
})
export class DepartamentoService<T> extends IService<DepartamentoModel> {
  constructor() {
    super('departamento', collection(db, 'departamento'), TIMES.timeServices, 'nome', 'asc');
  }
}
