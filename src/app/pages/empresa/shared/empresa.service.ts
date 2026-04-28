import { Injectable } from "@angular/core";
import { EmpresaModel, MOCK_EMPRESAS } from "./empresa.model";

@Injectable({
  providedIn: 'root',
})
export class EmpresaService {
  private isDelay = 500;

  async findAll() {
    return new Promise<EmpresaModel[]>((resolve) => {
      setTimeout(() => {
        resolve(MOCK_EMPRESAS);
      }, this.isDelay);
    });
  }

  async findById(id: number) {}

  async create(param: Partial<EmpresaModel>) {
    return new Promise<EmpresaModel[]>((resolve) => {
      MOCK_EMPRESAS.push(param as EmpresaModel);
      setTimeout(() => {
        resolve(MOCK_EMPRESAS);
      }, this.isDelay);
    });
  }

  async updateById(id: string, param: Partial<EmpresaModel>) {
    return new Promise<EmpresaModel[]>((resolve) => {
      setTimeout(() => {
        resolve(MOCK_EMPRESAS.map((d) => (d.id === id.toString() ? { ...d, ...param } : d)));
      }, this.isDelay);
    });
  }

  async deleteById(id: string) {
    return new Promise<EmpresaModel[]>((resolve) => {
      setTimeout(() => {
        resolve(MOCK_EMPRESAS.filter((d) => d.id !== id));
      }, this.isDelay);
    });
  }
}
