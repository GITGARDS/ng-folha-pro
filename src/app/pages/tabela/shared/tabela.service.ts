import { Injectable } from "@angular/core";
import { MOCK_TABELAS, TabelaModel } from "./tabela.model";

@Injectable({
  providedIn: 'root',
})
export class TabelaService {
  private isDelay = 500;

  async findAll() {
    return new Promise<TabelaModel[]>((resolve) => {
      setTimeout(() => {
        resolve(MOCK_TABELAS);
      }, this.isDelay);
    });
  }

  async findById(id: number) {}

  async create(param: TabelaModel) {
    return new Promise<TabelaModel[]>((resolve) => {
      MOCK_TABELAS.push(param);
      setTimeout(() => {
        resolve(MOCK_TABELAS);
      }, this.isDelay);
    });
  }

  async updateById(id: string, param: TabelaModel) {
    return new Promise<TabelaModel[]>((resolve) => {
      setTimeout(() => {
        resolve(MOCK_TABELAS.map((d) => (d.id === id.toString() ? { ...d, ...param } : d)));
      }, this.isDelay);
    });
  }

  async deleteById(id: string) {
    return new Promise<TabelaModel[]>((resolve) => {
      setTimeout(() => {
        resolve(MOCK_TABELAS.filter((d) => d.id !== id));
      }, this.isDelay);
    });
  }
}
