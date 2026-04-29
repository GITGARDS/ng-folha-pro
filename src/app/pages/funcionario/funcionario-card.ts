import { Component, inject } from "@angular/core";
import { MiniCard } from "../../core/mini-card";
import { FuncionarioStore } from "./shared/funcionario.store";

@Component({
  selector: 'app-funcionario-card',
  imports: [MiniCard],
  template: `
    <div class="flex flex-wrap gap-2">
      <app-mini-card
        icone="person_add"
        title="ativos"
        [valor]="funcionarioStore.totalAtivos().length || -1"
      />
      <app-mini-card
        icone="attach_money"
        title="total salario base"
        [valor]="funcionarioStore.totalSalarioBase() || -1"
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
