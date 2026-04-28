import { Injectable } from "@angular/core";
import { DepartamentoModel, MOCK_DEPARTAMENTOS } from "./departamento.model";

@Injectable({
  providedIn: 'root',
})
export class DepartamentoService {
  private isDelay = 500;

  async findAll() {
    return new Promise<DepartamentoModel[]>((resolve) => {
      setTimeout(() => {
        resolve(MOCK_DEPARTAMENTOS);
      }, this.isDelay);
    });
  }

  async findById(id: number) {}

  async create(param: DepartamentoModel) {
    return new Promise<DepartamentoModel[]>((resolve) => {
      setTimeout(() => {
        MOCK_DEPARTAMENTOS.push({ ...param, id: MOCK_DEPARTAMENTOS.length.toString()})
        resolve(MOCK_DEPARTAMENTOS);
      }, this.isDelay);
    });
  }

  async updateById(id: string, param: DepartamentoModel) {
    return new Promise<DepartamentoModel[]>((resolve) => {
      setTimeout(() => {
        resolve(MOCK_DEPARTAMENTOS.map((d) => (d.id === id ? { ...d, ...param } : d)));
      }, this.isDelay);
    });
  }

  async deleteById(id: string) {
    return new Promise<DepartamentoModel[]>((resolve) => {
      setTimeout(() => {
        resolve(MOCK_DEPARTAMENTOS.filter((d) => d.id !== id));
      }, this.isDelay);
    });
  }
}
