import { Component, inject } from "@angular/core";
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
        [valor]="funcionarioStore.totalAtivos().length"
        bg="bg-linear-to-b from-blue-400 via-blue-600 to-blue-800"
        text="text-white"

      />
      <!-- [valor]="funcionarioStore.totalSalarioBase() | currency: 'BRL'" -->
      <app-mini-card
        icone="attach_money"
        title="total salario base"
        [valor]="funcionarioStore.totalSalarioBase()"
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
}
