import { Injectable } from "@angular/core";
import { TIME_DELAY } from "../../../core/shared/consts";
import { IService } from "../../../core/shared/generics/i.service";

@Injectable({
  providedIn: 'root',
})
export class EmpresaService<T> extends IService<T> {
  constructor() {
    super('empresa', 'nomeEmpresaRazaoSocial', 'asc', TIME_DELAY);
  }
}
