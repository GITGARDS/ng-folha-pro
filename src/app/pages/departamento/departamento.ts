import { Component, inject } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ButtonNovo } from "../../core/components/button-novo";
import { InfoCard } from "../../core/components/info-card";
import { IsLoading } from "../../core/components/isLoading";
import { NavigationTitle } from "../../core/navigation/navigation-title";
import { DEPARTAMENTO } from "../../core/navigation/shared/navigation-model";
import DepartamentoCard from "./departamento-card";
import { DepartamentoForm } from "./departamento-form";
import { DepartamentoList } from "./departamento-list/departamento-list";
import { DEPARTAMENTO_MODEL_EMPTY, DepartamentoModel } from "./shared/departamento.model";
import { DepartamentoStore } from "./shared/departamento.store";

@Component({
  selector: 'app-departamento',
  imports: [NavigationTitle, IsLoading, DepartamentoList, DepartamentoCard, InfoCard, ButtonNovo],
  template: `
    <div class="flex flex-col gap-2">
      <app-navigation-title [title]="title" />
      <app-departamento-card />
      <app-button-novo (onCreate)="onCreate()" />
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
    const novo: DepartamentoModel = {
      ...DEPARTAMENTO_MODEL_EMPTY as DepartamentoModel,
      nome: `Departamento ${ultimoTabela}`,
    };

    this.openDialog('new', novo);
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
      // retirar campo id
      const { id, ...novo } = result;
      this.departamentoStore.create({ data: novo as DepartamentoModel });
    });
  }
}
