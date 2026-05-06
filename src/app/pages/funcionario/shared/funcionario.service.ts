import { Injectable } from "@angular/core";
import { collection } from "firebase/firestore";
import { db } from "../../../../firebase";
import { TIME_DELAY } from "../../../core/shared/consts";
import { IService } from "../../../core/shared/generics/i.service";
import { FuncionarioModel } from "./funcionario.model";

@Injectable({
  providedIn: 'root',
})
export class FuncionarioService<T> extends IService<FuncionarioModel> {
  constructor() {
    super('funcionario', collection(db, 'funcionario'), TIME_DELAY, 'nome', 'asc');
  }
}
