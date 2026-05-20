import { Injectable } from "@angular/core";
import { collection } from "firebase/firestore";
import { db } from "../../../../firebase";
import { TIME_DELAY } from "../../../core/shared/consts";
import { IService } from "../../../core/shared/generics/i.service";
import { ProdesModel } from "./prodes.model";

@Injectable({
  providedIn: 'root',
})
export class ProdesService<T> extends IService<ProdesModel> {
  constructor() {
    // super('prodes', TIME_DELAY);
    super('prodes', collection(db, 'prodes'), TIME_DELAY, 'descricao', 'asc');
  }
}
