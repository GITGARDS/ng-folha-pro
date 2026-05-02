import { Injectable } from "@angular/core";
import { collection } from "firebase/firestore";
import { db } from "../../../../firebase";
import { GenericsService } from "../../../shared/generics/generics.service";
import { FuncionarioModel } from "./funcionario.model";

@Injectable({
  providedIn: 'root',
})
export class FuncionarioService<T> extends GenericsService<FuncionarioModel> {
  constructor() {
    super('funcionario', collection(db, 'funcionario'), 500, 'nome', 'asc');
  }
}
