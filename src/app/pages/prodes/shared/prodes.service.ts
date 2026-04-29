import { Injectable } from "@angular/core";
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, updateDoc } from "firebase/firestore";
import { Observable, delay } from "rxjs";
import { db } from "../../../../firebase";
import { ProdesModel } from "./prodes.model";

@Injectable({
  providedIn: 'root',
})
export class ProdesService {
  colectionLabel = 'prodes';
  collectionName = collection(db, this.colectionLabel);

  private isDelay = 500;

  findAll() {
    const q = query(this.collectionName, orderBy('descricao'));
    return new Observable<ProdesModel[]>((observer) => {
      onSnapshot(q, (snapshot) => {
        const items: ProdesModel[] = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as ProdesModel);
        observer.next(items);
      });
    }).pipe(delay(this.isDelay));
    
  }

  async findById(id: number) {}

  async create(param: ProdesModel) {
    const docRef = await addDoc(this.collectionName, { ...param });
    return docRef.id;
  }

  async updateById(id: string, param: ProdesModel) {
    const docRef = doc(db, this.colectionLabel, id);
    await updateDoc(docRef, { ...param });
  }

  async deleteById(id: string) {
    const docRef = doc(db, this.colectionLabel, id);
    await deleteDoc(docRef);
  }
}
