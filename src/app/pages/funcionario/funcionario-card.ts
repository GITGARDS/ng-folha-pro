import { CurrencyPipe } from "@angular/common";
import { Component, inject } from "@angular/core";
import { MiniCard } from "../../core/components/mini-card";
import { FuncionarioStore } from "./shared/funcionario.store";

@Component({
  selector: 'app-funcionario-card',
  imports: [MiniCard, CurrencyPipe],
  template: `
    <div class="flex flex-wrap gap-2">
      <app-mini-card
        icone="person_add"
        title="ativos"
        [valor]="funcionarioStore.totalAtivos().length"
      />
      <app-mini-card
        icone="attach_money"
        title="total salario base"
        [valor]="(funcionarioStore.totalSalarioBase() | currency)"
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
