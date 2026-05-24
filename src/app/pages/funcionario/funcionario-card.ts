import { Component, effect, inject, signal } from "@angular/core";
import { MiniCard } from "../../core/components/mini-card";
import { TIME_DELAY } from "../../core/shared/consts";
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
  totalSalarioBase = signal<any>(false);
  totalAtivos = signal<any>(false);

  constructor() {
    effect(() => {
      this.totalAtivos.set(false);
      this.totalSalarioBase.set(false);
      setTimeout(() => {
        this.totalAtivos.set(this.funcionarioStore.totalAtivos().length);
        this.totalSalarioBase.set(this.funcionarioStore.totalSalarioBase());
      }, TIME_DELAY);
    });
  }
}
