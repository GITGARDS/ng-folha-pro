import { Component, inject, signal } from "@angular/core";
import { MatDivider } from "@angular/material/divider";
import { IsLoading } from "../../core/components/isLoading";
import { NavigationTitle } from "../../core/navigation/navigation-title";
import { EMPRESA } from "../../core/navigation/shared/navigation-model";
import { EmpresaList } from "./empresa-list/empresa-list";
import { EmpresaStore } from "./shared/empresa.store";

@Component({
  selector: 'app-empresa',
  imports: [NavigationTitle, MatDivider, IsLoading, EmpresaList],
  template: `
    <div>
      <section>
        <app-navigation-title [title]="title" />
      </section>
      <mat-divider></mat-divider>
      <section class="relative">
        <app-is-loading [isLoading]="empresaStore.isLoading()" />
      </section>
      <section>
        <app-empresa-list />
      </section>
    </div>
  `,
  styles: `
    :host {
      display: block;
      margin-top: 20px;
    }
  `,
})
export default class Empresa {
  title = EMPRESA;
  isLoading = signal<boolean>(false);
  empresaStore = inject(EmpresaStore);
}
