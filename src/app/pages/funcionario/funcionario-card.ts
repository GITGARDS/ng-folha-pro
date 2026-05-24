import { Component, effect, inject, signal } from "@angular/core";
import { MiniCard } from "../../core/components/mini-card";
import { FuncionarioStore } from "./shared/funcionario.store";

@Component({
  selector: 'app-funcionario-card',
  imports: [MiniCard],
  template: `
    <div class="flex flex-wrap gap-2">
      <app-mini-card
        icone="person_add"
        title="ativos"
        [valor]="totalAtivos() || -1"
        bg="bg-linear-to-b from-blue-400 via-blue-600 to-blue-800"
        text="text-white"
      />
      <app-mini-card
        icone="attach_money"
        title="Salario"
        [valor]="totalSalarioBase() || -1"
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
export class FuncionarioCard {
  funcionarioStore = inject(FuncionarioStore);
  totalAtivos = signal<number>(0);
  totalSalarioBase = signal<number>(0);

  constructor() {
    effect(() => {
      this.totalAtivos.set(this.funcionarioStore.totalAtivos().length);
      this.totalSalarioBase.set(this.funcionarioStore.totalSalarioBase());
    });
  }
}
