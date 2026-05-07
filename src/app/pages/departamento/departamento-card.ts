import { Component, inject } from "@angular/core";
import { DepartamentoStore } from "./shared/departamento.store";

@Component({
  selector: 'app-departamento-card',
  imports: [],
  template: `
    <div class="flex flex-wrap gap-2">
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
