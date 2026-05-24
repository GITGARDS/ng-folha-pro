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
        [valor]="totalAtivos()"
        bg="bg-linear-to-b from-blue-400 via-blue-600 to-blue-800"
        text="text-white"
      />
      <!-- [valor]="funcionarioStore.totalSalarioBase() | currency: 'BRL'" -->
      <app-mini-card
        icone="attach_money"
        title="total salario base"
        [valor]="totalSalarioBase()"
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
export default class FuncionarioCard {
  funcionarioStore = inject(FuncionarioStore);
  totalAtivos = signal<number | boolean>(false);
  totalSalarioBase = signal<number | boolean>(false);
  constructor() {
    this.totalAtivos.set(false);
    effect(() => {
      this.totalAtivos.set(this.funcionarioStore.totalAtivos().length);
    })
    this.totalSalarioBase.set(false);
    effect(() => {
      this.totalSalarioBase.set(this.funcionarioStore.totalSalarioBase());
    })
  }

}
