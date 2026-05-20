import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, delay, map } from "rxjs";

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
  url = '';
  isDelay = 0;
  http = inject(HttpClient);
  constructor(
    private tabela: String,
    private sisDelay: Number,
  ) {
    this.url = `http://localhost:3001/${this.tabela}`;
    this.isDelay = sisDelay as number;
  }

  findAll({ empresa }: { empresa?: string }): Observable<T[]> {
    return this.http.get<T[]>(this.url).pipe(
      delay(this.isDelay as number),
      map((res: any) => (empresa ? res.filter((f: any) => f.empresa === empresa) : res)),
    );
  }
  create({ data }: { data: T }): Observable<string> {
    return this.http.post<T>(this.url, data).pipe(
      delay(this.isDelay as number),
      map((res: any) => res.id),
    );
  }
  updateById({ id, data }: { id: string; data: Partial<T> }): Observable<void> {
    return this.http.put<T>(`${this.url}/${id}`, data).pipe(
      delay(this.isDelay as number),
      map(() => {}),
    );
  }
  deleteById({ id }: { id: string }): Observable<void> {
    return this.http.delete(`${this.url}/${id}`).pipe(
      delay(this.isDelay as number),
      map(() => {}),
    );
  }
}
