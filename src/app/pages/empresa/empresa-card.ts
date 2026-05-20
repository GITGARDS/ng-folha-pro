import { CurrencyPipe } from "@angular/common";
import { Component, effect, inject, signal } from "@angular/core";
import { MiniCard } from "../../core/components/mini-card";
import { FuncionarioStore } from "../funcionario/shared/funcionario.store";
import { EmpresaService } from "./shared/empresa.service";

@Component({
  selector: 'app-empresa-card',
  imports: [MiniCard, CurrencyPipe],
  template: `
    <div class="flex flex-wrap gap-2">
      <app-mini-card
        icone="person_add"
        title="ativos"
        [valor]="totalAtivos()"
        bg="bg-linear-to-b from-blue-400 via-blue-600 to-blue-800"
        text="text-white"
      />
      <app-mini-card
        icone="attach_money"
        title="total salario base"
        [valor]="totalSalarioBase() | currency: 'BRL'"
        bg="bg-linear-to-b from-green-400 via-green-600 to-green-800"
        text="text-white"
      />
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
})
export default class EmpresaCard {
  empresaService = inject(EmpresaService);
  funcionarioStore = inject(FuncionarioStore);

  totalSalarioBase = signal(0);
  totalAtivos = signal(0);

  constructor() {
    effect(() => {
      this.totalSalarioBase.set(
        this.empresaService.idEmpresaLogada() ? this.funcionarioStore.totalSalarioBase() : 0,
      );
      this.totalAtivos.set(
        this.empresaService.idEmpresaLogada() ? this.funcionarioStore.totalAtivos().length : 0,
      );
    });
  }
}
