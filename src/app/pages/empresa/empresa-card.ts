import { Component, inject } from "@angular/core";
import { EmpresaStore } from "./shared/empresa.store";

@Component({
  selector: 'app-empresa-card',
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
export default class EmpresaCard {
  empresaStore = inject(EmpresaStore);
}
