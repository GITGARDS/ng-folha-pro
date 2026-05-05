import { Injectable } from "@angular/core";
import { collection } from "firebase/firestore";
import { db } from "../../../../firebase";
import { TIMES } from "../../../core/shared/consts/app.consts";
import { IService } from "../../../core/shared/generics/i.service";
import { ProdesModel } from "./prodes.model";

@Injectable({
  providedIn: 'root',
})
export class ProdesService<T> extends IService<ProdesModel> {
  constructor() {
    super('prodes', collection(db, 'prodes'), TIMES.timeServices, 'descricao', 'asc');
  }
}
