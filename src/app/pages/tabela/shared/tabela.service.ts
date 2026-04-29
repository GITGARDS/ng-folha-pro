import { Injectable } from "@angular/core";
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, updateDoc } from "firebase/firestore";
import { Observable, delay } from "rxjs";
import { db } from "../../../../firebase";
import { TabelaModel } from "./tabela.model";

@Injectable({
  providedIn: 'root',
})
export class TabelaService {
  colectionLabel = 'tabela';
  collectionName = collection(db, this.colectionLabel);

  private isDelay = 500;

  findAll(param: { empresa: string }) {
    const q = query(this.collectionName, orderBy('nome'));
    return new Observable<TabelaModel[]>((observer) => {
      onSnapshot(q, (snapshot) => {
        const items: TabelaModel[] = snapshot.docs
          // .filter((f: any) => f.data().empresa === param.empresa)
          .map(
            (d) =>
              ({
                id: d.id,
                ...d.data(),
              }) as TabelaModel,
          );
        // const items: TabelaModel[] = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as TabelaModel);
        observer.next(items);
      });
    }).pipe(delay(this.isDelay));
  }

  async create(param: TabelaModel) {
    const docRef = await addDoc(this.collectionName, { ...param });
    return docRef.id;
  }

  async updateById(id: string, data: TabelaModel) {
    const docRef = doc(db, this.colectionLabel, id);
    await updateDoc(docRef, { ...data });
  }

  async deleteById(id: string) {
    const docRef = doc(db, this.colectionLabel, this.colectionLabel, id);
    await deleteDoc(docRef);
  }
}
