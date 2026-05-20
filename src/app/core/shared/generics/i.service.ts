import { Injectable } from "@angular/core";
import { onSnapshot, orderBy, query } from "firebase/firestore";
import { Observable, delay } from "rxjs";

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
  path = '';
  firestore: any;
  isDelay = 0;
  orderBy = '';
  order = '';

  constructor(
    private spath: String,
    private sfirestone: Object,
    private sisDelay: Number,
    private sorderBy: String,
    private sorder: String,
  ) {
    this.path = spath as string;
    this.firestore = sfirestone;
    this.isDelay = sisDelay as number;
    this.orderBy = sorderBy as string;
    this.order = sorder as string;
  }

  findAll({ empresa }: { empresa?: string }): Observable<T[]> {
    const q = query(this.firestore, orderBy(this.orderBy, this.order as 'asc' | 'desc'));
    return new Observable<T[]>((observer) => {
      onSnapshot(q, (snapshot) => {
        const items: T[] = snapshot.docs
          .filter((f: any) => (empresa ? f.data().empresa === empresa : f))
          .map((d) => ({ id: d.id, ...(d.data() as T) }));
        observer.next(items);
      });
    }).pipe(delay(this.isDelay as number));
  }
  create({ data }: { data: T }): Observable<string> {
    return new Observable<string>((observer) => {
      this.firestore
        .collection(this.path)
        .add(data)
        .then((docRef: any) => {
          observer.next(docRef.id);
        })
        .catch((error: any) => {
          observer.error(error);
        });
    }).pipe(delay(this.isDelay as number));
  }
  updateById({ id, data }: { id: string; data: Partial<T> }): Observable<void> {
    return new Observable<void>((observer) => {
      this.firestore
        .collection(this.path)
        .doc(id)
        .update(data)
        .then(() => {
          observer.next();
        })
        .catch((error: any) => {
          observer.error(error);
        });
    }).pipe(delay(this.isDelay as number));
  }
  deleteById({ id }: { id: string }): Observable<void> {
    return new Observable<void>((observer) => {
      this.firestore
        .collection(this.path)
        .doc(id)
        .delete()
        .then(() => {
          observer.next();
        })
        .catch((error: any) => {
          observer.error(error);
        });
    }).pipe(delay(this.isDelay as number));
  }
}
