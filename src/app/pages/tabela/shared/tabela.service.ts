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

  findAll() {
    const q = query(this.collectionName, orderBy('referencia', 'desc'));
    return new Observable<TabelaModel[]>((observer) => {
      onSnapshot(q, (snapshot) => {
        const items: TabelaModel[] = snapshot.docs.map((d) => ({ id: d.id, ...d.data() })) as TabelaModel[];

          // .filter((f: any) => f.data().empresa === param.empresa)
          // const items: TabelaModel[] = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as TabelaModel);
          // .map((d) => ({ id: d.id, ...d.data() }) as TabelaModel);
        observer.next(items);
      });
    }).pipe(delay(this.isDelay));
  }

  async create(param: TabelaModel) {
    return await addDoc(this.collectionName, param).then((docRef) => docRef.id);
  }

  async updateById(id: string, data: TabelaModel) {
    const docRef = doc(db, this.colectionLabel, id);
    await updateDoc(docRef, { ...data });
  }

  async deleteById(id: string) {
    console.log('delete', id);
    const docRef = doc(db, this.colectionLabel, this.colectionLabel, id);
    await deleteDoc(docRef);
  }
}
