import { Component, inject } from "@angular/core";
import { MiniCard } from "../../core/mini-card";
import { TabelaStore } from "./shared/tabela.store";

@Component({
  selector: 'app-tabela-card',
  imports: [MiniCard],
  template: `
    <div class="flex flex-wrap gap-2">
      <app-mini-card
        icone="person_add"
        title="ativos"
        [valor]="tabelaStore.totalAtivos().length"
      />
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
})
export default class TabelaCard {
  tabelaStore = inject(TabelaStore);
}
