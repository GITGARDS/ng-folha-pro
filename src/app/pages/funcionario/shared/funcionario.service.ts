import { Injectable } from "@angular/core";
import { TIME_DELAY } from "../../../core/shared/consts";
import { IService } from "../../../core/shared/generics/i.service";
import { FuncionarioModel } from "./funcionario.model";

@Injectable({
  providedIn: 'root',
})
export class FuncionarioService<T> extends IService<FuncionarioModel> {
  constructor() {
    super('funcionario', TIME_DELAY);
  }
}
