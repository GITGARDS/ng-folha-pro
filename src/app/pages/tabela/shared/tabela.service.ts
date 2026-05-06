import { Injectable } from "@angular/core";
import { collection } from "firebase/firestore";
import { db } from "../../../../firebase";
import { TIME_DELAY } from "../../../core/shared/consts";
import { IService } from "../../../core/shared/generics/i.service";
import { TabelaModel } from "./tabela.model";

@Injectable({
  providedIn: 'root',
})
export class TabelaService extends IService<TabelaModel> {
  constructor() {
    super('tabela', collection(db, 'tabela'), TIME_DELAY, 'referencia', 'desc');
  }
}
