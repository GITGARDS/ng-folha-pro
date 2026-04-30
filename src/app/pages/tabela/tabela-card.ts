import { Component, inject } from "@angular/core";
import { TabelaStore } from "./shared/tabela.store";

@Component({
  selector: 'app-tabela-card',
  imports: [],
  template: ` <div class="flex flex-wrap gap-2"></div> `,
  styles: `
    :host {
      display: block;
    }
  `,
})
export default class TabelaCard {
  tabelaStore = inject(TabelaStore);
}
