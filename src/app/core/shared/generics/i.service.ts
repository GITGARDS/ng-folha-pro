import { Injectable } from "@angular/core";
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, updateDoc } from "firebase/firestore";
import { Observable, delay, take } from "rxjs";
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
  vFirestore: any;

  constructor(
    private vcollection: String,
    private vorderBy: String,
    private vorder: String,
    private visDelay: Number,
  ) {
    this.vFirestore = collection(db, vcollection as string);
  }

  findAll({ empresa }: { empresa?: string }): Observable<T[]> {
    const q = query(
      this.vFirestore as any,
      orderBy(this.vorderBy as string, this.vorder as 'asc' | 'desc'),
    );
    return new Observable<T[]>((observer) => {
      onSnapshot(q, (snapshot) => {
        const items: T[] = snapshot.docs
          .filter((f: any) => (empresa ? f.data().empresa === empresa : f))
          .map((d) => ({ id: d.id, ...(d.data() as T) }));
        observer.next(items);
      });
    // }).pipe(delay(this.visDelay as number + 500));
    }).pipe(delay(this.visDelay as number * 3), take(1));
  }
  create({ data }: { data: T }): Observable<string> {
    return new Observable<string>((observer) => {
      addDoc(this.vFirestore as any, data as any)
        .then((docRef: any) => {
          observer.next(docRef.id);
        })
        .catch((error: any) => {
          observer.error(error);
        });
    }).pipe(delay(this.visDelay as number));
  }
  updateById({ id, data }: { id: string; data: Partial<T> }): Observable<void> {
    return new Observable<void>((observer) => {
      const docRef = doc(db, this.vcollection as string, id);
      updateDoc(docRef, { ...data })
        .then(() => {
          observer.next();
        })
        .catch((error: any) => {
          observer.error(error);
        });
    }).pipe(delay(this.visDelay as number));
  }
  deleteById({ id }: { id: string }): Observable<void> {
    return new Observable<void>((observer) => {
      const docRef = doc(db, this.vcollection as string, id);
      deleteDoc(docRef)
        .then(() => {
          observer.next();
        })
        .catch((error: any) => {
          observer.error(error);
        });
    }).pipe(delay(this.visDelay as number));
  }
}
