import { Injectable } from "@angular/core";
import { MOCK_PRODES, ProdesModel } from "./prodes.model";

@Injectable({
  providedIn: 'root',
})
export class ProdesService {
  private isDelay = 500;

  async findAll() {
    return new Promise<ProdesModel[]>((resolve) => {
      setTimeout(() => {
        resolve(MOCK_PRODES);
      }, this.isDelay);
    });
  }

  async findById(id: number) {}

  async create(param: ProdesModel) {
    return new Promise<ProdesModel[]>((resolve) => {
      MOCK_PRODES.push(param);
      setTimeout(() => {
        resolve(MOCK_PRODES);
      }, this.isDelay);
    });
  }

  async updateById(id: string, param: ProdesModel) {
    return new Promise<ProdesModel[]>((resolve) => {
      setTimeout(() => {
        resolve(MOCK_PRODES.map((d) => (d.id === id.toString() ? { ...d, ...param } : d)));
      }, this.isDelay);
    });
  }

  async deleteById(id: string) {
    return new Promise<ProdesModel[]>((resolve) => {
      setTimeout(() => {
        resolve(MOCK_PRODES.filter((d) => d.id !== id));
      }, this.isDelay);
    });
  }
}
