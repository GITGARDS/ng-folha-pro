import { Component, inject } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ButtonNovo } from "../../core/components/button-novo";
import { InfoCard } from "../../core/components/info-card";
import { IsLoading } from "../../core/components/isLoading";
import { NavigationTitle } from "../../core/navigation/navigation-title";
import { PRODES } from "../../core/navigation/shared/navigation-model";
import ProdesCard from "./prodes-card";
import { ProdesForm } from "./prodes-form";
import { ProdesList } from "./prodes-list/prodes-list";
import { ProdesStore } from "./shared/prodes.store";

@Component({
  selector: 'app-prodes',
  imports: [NavigationTitle, IsLoading, ProdesList, ProdesCard, InfoCard, ButtonNovo],
    template: `
    <div class="flex flex-col gap-2">
      <app-navigation-title [title]="title" />
      <app-prodes-card />
      <app-button-novo (onCreate)="onCreate()"/>
      <div class="h-[50vh] relative rounded-lg flex flex-col">
        <app-is-loading [isLoading]="prodesStore.isLoading()" />
        <div class="h-[50vh] overflow-hidden">
          @if (prodesStore.list().length > 0) {
            <app-prodes-list />
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

export default class Prodes {
  title = PRODES;
  prodesStore = inject(ProdesStore);

  readonly dialog = inject(MatDialog);
  onCreate() {
    const ultimoTabela = this.prodesStore.list().length + 1;
    const novo: Partial<any> = {} as any;
    this.openDialog('new', novo as any);
  }
  openDialog(opcao: string, data: any) {
    const dialogRef = this.dialog.open(ProdesForm, {
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
      this.prodesStore.create({
        data: result as any,
      });
    });
  }
}
