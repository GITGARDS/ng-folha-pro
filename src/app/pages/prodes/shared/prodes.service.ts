import { Injectable } from "@angular/core";
import { collection } from "firebase/firestore";
import { db } from "../../../../firebase";
import { GenericsService } from "../../../shared/generics/generics.service";
import { ProdesModel } from "./prodes.model";

@Injectable({
  providedIn: 'root',
})
export class ProdesService<T> extends GenericsService<ProdesModel> {
  constructor() {
    super('prodes', collection(db, 'prodes'), 50, 'descricao', 'asc');
  }
}
