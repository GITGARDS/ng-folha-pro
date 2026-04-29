import { Component, inject, signal } from "@angular/core";
import { IsLoading } from "../../core/components/isLoading";
import { NavigationTitle } from "../../core/navigation/navigation-title";
import { EMPRESA } from "../../core/navigation/shared/navigation-model";
import EmpresaCard from "./empresa-card";
import { EmpresaList } from "./empresa-list/empresa-list";
import { EmpresaStore } from "./shared/empresa.store";

@Component({
  selector: 'app-empresa',
  imports: [NavigationTitle, IsLoading, EmpresaList, EmpresaCard],
  template: `
    <section>
      <div class="flex flex-wrap items-center">
        <app-navigation-title [title]="title" />
        <app-empresa-card />
      </div>
    </section>
    <section class="h-[calc(100vh-200px)] relative">
      <app-is-loading [isLoading]="empresaStore.isLoading()" />
      <app-empresa-list />
    </section>
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
