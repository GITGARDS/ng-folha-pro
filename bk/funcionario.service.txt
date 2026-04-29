import { Injectable } from "@angular/core";
import { FuncionarioModel, MOCK_FUNCIONARIOS } from "./funcionario.model";

@Injectable({
  providedIn: 'root',
})
export class FuncionarioService {
  private isDelay = 500;

  async findAll() {
    return new Promise<FuncionarioModel[]>((resolve) => {
      setTimeout(() => {
        resolve(MOCK_FUNCIONARIOS);
      }, this.isDelay);
    });
  }

  async findById(id: number) {}

  async create(param: FuncionarioModel) {
    return new Promise<FuncionarioModel[]>((resolve) => {
      MOCK_FUNCIONARIOS.push(param);
      setTimeout(() => {
        resolve(MOCK_FUNCIONARIOS);
      }, this.isDelay);
    });
  }

  async updateById(id: string, param: FuncionarioModel) {
    return new Promise<FuncionarioModel[]>((resolve) => {
      setTimeout(() => {
        resolve(MOCK_FUNCIONARIOS.map((d) => (d.id === id.toString() ? { ...d, ...param } : d)));
      }, this.isDelay);
    });
  }

  async deleteById(id: string) {
    return new Promise<FuncionarioModel[]>((resolve) => {
      setTimeout(() => {
        resolve(MOCK_FUNCIONARIOS.filter((d) => d.id !== id));
      }, this.isDelay);
    });
  }
}
