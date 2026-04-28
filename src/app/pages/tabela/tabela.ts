import { Component, inject, signal } from "@angular/core";
import { MatDivider } from "@angular/material/divider";
import { IsLoading } from "../../core/components/isLoading";
import { NavigationTitle } from "../../core/navigation/navigation-title";
import { TABELA } from "../../core/navigation/shared/navigation-model";
import { TabelaStore } from "./shared/tabela.store";
import { TabelaList } from "./tabela-list/tabela-list";

@Component({
  selector: 'app-tabela',
  imports: [NavigationTitle, MatDivider, IsLoading, TabelaList],
  template: `
    <div>
      <section>
        <app-navigation-title [title]="title" />
      </section>
      <mat-divider></mat-divider>
      <section class="relative">
        <app-is-loading [isLoading]="tabelaStore.isLoading()" />
        <app-tabela-list />
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
export default class Tabela {
  title = TABELA;
  isLoading = signal<boolean>(false);
  tabelaStore = inject(TabelaStore);
}
