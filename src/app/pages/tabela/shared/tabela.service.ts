import { Injectable } from "@angular/core";
import { TIME_DELAY } from "../../../core/shared/consts";
import { IService } from "../../../core/shared/generics/i.service";
import { TabelaModel } from "./tabela.model";

@Injectable({
  providedIn: 'root',
})
export class TabelaService extends IService<TabelaModel> {
  constructor() {
    super('tabela', TIME_DELAY);
  }
}
