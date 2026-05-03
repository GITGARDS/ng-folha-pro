import { Injectable } from "@angular/core";
import { addDoc, deleteDoc, doc, onSnapshot, orderBy, query, updateDoc, where } from "firebase/firestore";
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

    const console2 = empresa ? 'empresa' : '----';

    console.log('find all empresa',console2);

    const q = empresa
      ? query(
          this.firestore,
          where('empresa', '==', empresa),
          orderBy(this.orderBy, this.order as 'asc' | 'desc'),
        )
      : query(this.firestore, orderBy(this.orderBy, this.order as 'asc' | 'desc'));

      console.log('find all q',q);

    return new Observable<T[]>((observer) => {
      onSnapshot(q, (snapshot) => {
        const items: T[] = snapshot.docs
          // .filter((f: any) => (empresa ? f.data().empresa === empresa : f))
          .map((d) => ({
            id: d.id,
            ...(d.data() as T),
          }));
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
    const docRef = doc(db, this.path, id);
    await deleteDoc(docRef);
  }
}
