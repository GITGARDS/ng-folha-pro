import { Component, inject, signal } from "@angular/core";
import { IsLoading } from "../../core/components/isLoading";
import { NavigationTitle } from "../../core/navigation/navigation-title";
import { TABELA } from "../../core/navigation/shared/navigation-model";
import { TabelaStore } from "./shared/tabela.store";
import { TabelaForm } from "./tabela-form";

@Component({
  selector: 'app-tabela',
  imports: [NavigationTitle, IsLoading, TabelaForm],
  template: `
    <section>
      <div class="flex flex-wrap items-center">
        <app-navigation-title [title]="title" />
      </div>
    </section>
    <section class="h-[calc(100vh-200px)] relative">
      <app-is-loading [isLoading]="tabelaStore.isLoading()" />
      <app-tabela-form />
    </section>
  `,
  styles: `
    :host {
      display: block;
      margin-top: 20px;
    }
  `,
})
export default class Tabela {
  title = TABELA;
  isLoading = signal<boolean>(false);
  tabelaStore = inject(TabelaStore);
}
