import { Injectable, signal } from "@angular/core";
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, updateDoc } from "firebase/firestore";
import { Observable, delay } from "rxjs";
import { db } from "../../../../firebase";
import { DepartamentoModel } from "./departamento.model";

@Injectable({
  providedIn: 'root',
})
export class DepartamentoService {
  colectionLabel = 'departamento';
  collectionName = collection(db, this.colectionLabel);
  idDepartamentoLogada = signal<string | number | null>(null);
  private isDelay = 500;

  findAll() {
    const q = query(this.collectionName, orderBy('nome'));
    return new Observable<DepartamentoModel[]>((observer) => {
      onSnapshot(q, (snapshot) => {
        const items: DepartamentoModel[] = snapshot.docs.map(
          (d) => ({ id: d.id, ...d.data() }) as DepartamentoModel,
        );
        observer.next(items);
      });
    }).pipe(delay(this.isDelay));
  }

  async findById(id: number) {}

  async create(param: DepartamentoModel) {
    const docRef = await addDoc(this.collectionName, { ...param });
    return docRef.id;
  }

  async updateById(id: string, param: DepartamentoModel) {
    const docRef = doc(db, this.colectionLabel, id);
    await updateDoc(docRef, { ...param });
  }

  async deleteById(id: string) {
    const docRef = doc(db, this.colectionLabel, id);
    await deleteDoc(docRef);
  }
  
}
