import { Component, signal } from "@angular/core";
import * as packageInfo from "../../../../package.json";

@Component({
  selector: 'app-header-versao',
  imports: [],

  template: `
    <span
      class="text-sm font-light leading-6"
      >{{ versao() }}</span
    >
  `,
  styles: `
    .flex {
      display: flex;
    }
  `,
})
export class AppHeaderVersao {
  versao = signal<string>('1.0.0');

  constructor() {
    this.versao.set(packageInfo.version);
  }
}
