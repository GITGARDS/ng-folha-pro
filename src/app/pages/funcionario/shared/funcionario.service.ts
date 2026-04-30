import { Injectable } from "@angular/core";
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, updateDoc } from "firebase/firestore";
import { Observable, delay } from "rxjs";
import { db } from "../../../../firebase";
import { FuncionarioModel } from "./funcionario.model";

@Injectable({
  providedIn: 'root',
})
export class FuncionarioService {
  colectionLabel = 'funcionario';
  collectionName = collection(db, this.colectionLabel);

  private isDelay = 500;

  findAll(param: { empresa: string }) {
    const q = query(this.collectionName, orderBy('nome'));
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

  async create(param: FuncionarioModel) {
    return await addDoc(this.collectionName, param).then((docRef) => docRef.id);
  }

  async updateById(id: string, data: FuncionarioModel) {
    const docRef = doc(db, this.colectionLabel, id);
    await updateDoc(docRef, { ...data });
  }

  async deleteById(id: string) {
    const docRef = doc(db, this.colectionLabel, this.colectionLabel, id);
    await deleteDoc(docRef);
  }
}
