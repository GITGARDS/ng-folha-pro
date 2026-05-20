import { Component, inject } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ButtonNovo } from "../../core/components/button-novo";
import { InfoCard } from "../../core/components/info-card";
import { IsLoading } from "../../core/components/isLoading";
import { NavigationTitle } from "../../core/navigation/navigation-title";
import { TABELA } from "../../core/navigation/shared/navigation-model";
import { TabelaStore } from "./shared/tabela.store";
import TabelaCard from "./tabela-card";
import { TabelaForm } from "./tabela-form";
import { TabelaList } from "./tabela-list/tabela-list";

@Component({
  selector: 'app-tabela',
  imports: [NavigationTitle, IsLoading, TabelaList, TabelaCard, InfoCard, ButtonNovo],
    template: `
    <div class="flex flex-col gap-2">
      <app-navigation-title [title]="title" />
      <app-tabela-card />
      <app-button-novo (onCreate)="onCreate()"/>
      <div class="h-[60vh] relative rounded-lg flex flex-col">
        <app-is-loading [isLoading]="tabelaStore.isLoading()" />
        <div class="h-[60vh] overflow-hidden">
          @if (tabelaStore.list().length > 0) {
            <app-tabela-list />
          } @else {
            <app-info-card />
          }
        </div>
      </div>
    </div>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  `,
})

export default class Tabela {
  title = TABELA;
  tabelaStore = inject(TabelaStore);

  readonly dialog = inject(MatDialog);
  onCreate() {
    const ultimoTabela = this.tabelaStore.list().length + 1;
    const novo: Partial<any> = {} as any;
    this.openDialog('new', novo as any);
  }
  openDialog(opcao: string, data: any) {
    const dialogRef = this.dialog.open(TabelaForm, {
      width: 'auto',
      height: '750px',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data: { opcao, data },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }
      this.tabelaStore.create({
        data: result as any,
      });
    });
  }
}
