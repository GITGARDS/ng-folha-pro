import { Inject, Injectable } from "@angular/core";
import { addDoc, deleteDoc, doc, onSnapshot, orderBy, query, updateDoc } from "firebase/firestore";
import { Observable, delay } from "rxjs";
import { db } from "../../../firebase";

interface iGenericsService<T> {
  findAll({ empresa }: { empresa?: string }): Observable<T[]>;

  create({ data }: { data: T }): Promise<string>;

  updateById({ id, data }: { id: string; data: Partial<T> }): Promise<void>;

  deleteById({ id }: { id: string }): Promise<void>;
}

@Injectable({
  providedIn: 'root',
})
export class GenericsService<T> implements iGenericsService<T> {
  path = '';
  firestore: any;
  isDelay = 0;
  orderBy = '';
  order = '';

  constructor(
    @Inject(String) path: string,
    @Inject(Object) firestone: any,
    @Inject(Number) isDelay: number,
    @Inject(String) orderBy: string,
    @Inject(String) order: string,
  ) {
    this.path = path;
    this.firestore = firestone;
    this.isDelay = isDelay;
    this.orderBy = orderBy;
    this.order = order;
  }

  findAll({ empresa }: { empresa?: string }): Observable<T[]> {
    const q = query(this.firestore, orderBy(this.orderBy, this.order as 'asc' | 'desc'));
    return new Observable<T[]>((observer) => {
      onSnapshot(q, (snapshot) => {
        const items: T[] = snapshot.docs
          .filter((f: any) => (empresa ? f.data().empresa === empresa : true))
          .map((d) => ({
            id: d.id,
            ...(d.data() as T),
          })) as T[];
        observer.next(items);
      });
    }).pipe(delay(this.isDelay as number));
  }
  async create({ data }: { data: T }): Promise<string> {
    return await addDoc(this.firestore, data as any).then((docRef) => docRef.id);
  }
  async updateById({ id, data }: { id: string; data: Partial<T> }): Promise<void> {
    const docRef = doc(db, this.path, id);
    await updateDoc(docRef, { ...data });
  }
  async deleteById({ id }: { id: string }): Promise<void> {
    const docRef = doc(db, this.path, this.path, id);
    await deleteDoc(docRef);
  }
}
