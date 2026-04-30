import { Component, inject, signal } from "@angular/core";
import { IsLoading } from "../../core/components/isLoading";
import { NavigationTitle } from "../../core/navigation/navigation-title";
import { TABELA } from "../../core/navigation/shared/navigation-model";
import { TabelaStore } from "./shared/tabela.store";
import TabelaCard from "./tabela-card";
import { TabelaList } from "./tabela-list/tabela-list";

@Component({
  selector: 'app-tabela',
  imports: [NavigationTitle, IsLoading, TabelaList, TabelaCard],
  template: `
    <section>
      <div class="flex flex-wrap items-center">
        <app-navigation-title [title]="title" />
        <app-tabela-card />
      </div>
    </section>
    <section class="h-[calc(100vh-200px)] relative">
      <app-is-loading [isLoading]="tabelaStore.isLoading()" />
      <app-tabela-list />
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
