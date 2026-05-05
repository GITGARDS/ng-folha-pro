import { Injectable } from "@angular/core";
import { collection } from "firebase/firestore";
import { db } from "../../../../firebase";
import { TIMES } from "../../../core/shared/consts/app.consts";
import { IService } from "../../../core/shared/generics/i.service";
import { FuncionarioModel } from "./funcionario.model";

@Injectable({
  providedIn: 'root',
})
export class FuncionarioService<T> extends IService<FuncionarioModel> {
  constructor() {
    super('funcionario', collection(db, 'funcionario'), TIMES.timeServices, 'nome', 'asc');
  }
}
