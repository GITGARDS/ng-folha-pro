import { Injectable } from "@angular/core";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { Observable, delay } from "rxjs";
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

  findAllByEmpresa ({ empresa }: { empresa: string }) {
    const q = query(collection(db, 'funcionario'), orderBy('nome'));
    return new Observable<FuncionarioModel[]>((observer) => {
      onSnapshot(q, (snapshot) => {
        const items: FuncionarioModel[] = snapshot.docs
          // .filter((f: any) => f.data().empresa === param.empresa)
          .map(
            (d) =>
              ({
                id: d.id,
                ...d.data(),
              }) as FuncionarioModel,
          );
        // const items: FuncionarioModel[] = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as FuncionarioModel);
        observer.next(items);
      });
    }).pipe(delay(this.isDelay));
  }
}
