import { Component, inject } from "@angular/core";
import { MiniCard } from "../../core/mini-card";
import { DepartamentoStore } from "./shared/departamento.store";

@Component({
  selector: 'app-departamento-card',
  imports: [MiniCard],
  template: `
    <div class="flex flex-wrap gap-2">
      <app-mini-card
        icone="person_add"
        title="ativos"
        [valor]="departamentoStore.totalAtivos().length"
      />
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
})
export default class DepartamentoCard {
  departamentoStore = inject(DepartamentoStore);  
}
