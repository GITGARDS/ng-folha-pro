import { MatDialog } from "@angular/material/dialog";
import { Component, inject } from "@angular/core";

import { DEPARTAMENTO } from "../../core/navigation/shared/navigation-model";
import { NavigationTitle } from "../../core/navigation/navigation-title";
import { DepartamentoList } from "./departamento-list/departamento-list";
import { DepartamentoStore } from "./shared/departamento.store";
import { ButtonNovo } from "../../core/components/button-novo";
import { IsLoading } from "../../core/components/isLoading";
import { InfoCard } from "../../core/components/info-card";
import { DepartamentoForm } from "./departamento-form";
import DepartamentoCard from "./departamento-card";


@Component({
  selector: 'app-departamento',
  imports: [NavigationTitle, IsLoading, DepartamentoList, DepartamentoCard, InfoCard, ButtonNovo],
  template: `
    <div class="flex flex-col gap-2">
      <app-navigation-title [title]="title" />
      <app-departamento-card />
      <app-button-novo (onCreate)="onCreate()"/>
      <div class="h-[60vh] relative rounded-lg flex flex-col">
        <app-is-loading [isLoading]="departamentoStore.isLoading()" />
        <div class="h-[60vh] overflow-hidden">
          @if (departamentoStore.list().length > 0) {
            <app-departamento-list />
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
export default class Departamento {
  title = DEPARTAMENTO;
  departamentoStore = inject(DepartamentoStore);

  readonly dialog = inject(MatDialog);
  onCreate() {
    const ultimoTabela = this.departamentoStore.list().length + 1;
    const novo: Partial<any> = {} as any;
    this.openDialog('new', novo as any);
  }
  openDialog(opcao: string, data: any) {
    const dialogRef = this.dialog.open(DepartamentoForm, {
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
      this.departamentoStore.create({
        data: result as any,
      });
    });
  }
}
