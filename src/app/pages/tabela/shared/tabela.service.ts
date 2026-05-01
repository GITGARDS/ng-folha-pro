import { Injectable } from "@angular/core";
import { collection } from "firebase/firestore";
import { db } from "../../../../firebase";
import { GenericsService } from "../../../shared/generics/generics.service";
import { TabelaModel } from "./tabela.model";

@Injectable({
  providedIn: 'root',
})
export class TabelaService extends GenericsService<TabelaModel> {
  constructor() {
    super('tabela', collection(db, 'tabela'), 500, 'referencia', 'desc');
  }
}
