import { Injectable } from "@angular/core";
import { TIME_DELAY } from "../../../core/shared/consts";
import { IService } from "../../../core/shared/generics/i.service";
import { DepartamentoModel } from "./departamento.model";

@Injectable({
  providedIn: 'root',
})
export class DepartamentoService<T> extends IService<DepartamentoModel> {
  constructor() {
    // super('departamento', TIME_DELAY);
    super('departamento', 'nome', 'asc', TIME_DELAY);
  }
}
