import { Injectable } from "@angular/core";
import { addDoc, deleteDoc, doc, onSnapshot, orderBy, query, updateDoc } from "firebase/firestore";
import { Observable, delay } from "rxjs";
import { db } from "../../../../firebase";

interface iService<T> {
  findAll({ empresa }: { empresa?: string }): Observable<T[]>;

  create({ data }: { data: T }): Observable<string>;

  updateById({ id, data }: { id: string; data: Partial<T> }): Observable<void>;

  deleteById({ id }: { id: string }): Observable<void>;
}

@Injectable({
  providedIn: 'root',
})
export class IService<T> implements iService<T> {
  vCollection;
  vFirestore: any;
  vIsDelay = 0;
  vOrderBy = '';
  vOrder = '';

  constructor(
    private vcollection: String,
    private vfirestore: Object,
    private visDelay: Number,
    private vorderBy: String,
    private vorder: String,
  ) {
    this.vCollection = vcollection as string;
    this.vFirestore = vfirestore as any;
    this.vIsDelay = visDelay as number;
    this.vOrderBy = vorderBy as string;
    this.vOrder = vorder as string;
  }

  findAll({ empresa }: { empresa?: string }): Observable<T[]> {
    const q = query(this.vFirestore, orderBy(this.vOrderBy, this.vOrder as 'asc' | 'desc'));
    return new Observable<T[]>((observer) => {
      onSnapshot(q, (snapshot) => {
        const items: T[] = snapshot.docs
          .filter((f: any) => (empresa ? f.data().empresa === empresa : f))
          .map((d) => ({ id: d.id, ...(d.data() as T) }));
        observer.next(items);
      });
    }).pipe(delay(this.vIsDelay as number));
  }
  create({ data }: { data: T }): Observable<string> {
    return new Observable<string>((observer) => {
      addDoc(this.vFirestore, data as any)
        .then((docRef: any) => {
          observer.next(docRef.id);
        })
        .catch((error: any) => {
          observer.error(error);
        });
    }).pipe(delay(this.vIsDelay as number));
  }
  updateById({ id, data }: { id: string; data: Partial<T> }): Observable<void> {
    return new Observable<void>((observer) => {
      const docRef = doc(db, this.vCollection, id);
      updateDoc(docRef, { ...data })
        .then(() => {
          observer.next();
        })
        .catch((error: any) => {
          observer.error(error);
        });
    }).pipe(delay(this.vIsDelay as number));
  }
  deleteById({ id }: { id: string }): Observable<void> {
    return new Observable<void>((observer) => {
      const docRef = doc(db, this.vCollection, id);
      deleteDoc(docRef)
        .then(() => {
          observer.next();
        })
        .catch((error: any) => {
          observer.error(error);
        });
    }).pipe(delay(this.vIsDelay as number));
  }
}
