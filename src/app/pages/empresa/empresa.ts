import { Component, inject } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ButtonNovo } from "../../core/components/button-novo";
import { InfoCard } from "../../core/components/info-card";
import { IsLoading } from "../../core/components/isLoading";
import { NavigationTitle } from "../../core/navigation/navigation-title";
import { EMPRESA } from "../../core/navigation/shared/navigation-model";
import EmpresaCard from "./empresa-card";
import { EmpresaForm } from "./empresa-form";
import { EmpresaList } from "./empresa-list/empresa-list";
import { EmpresaStore } from "./shared/empresa.store";

@Component({
  selector: 'app-empresa',
  imports: [
    NavigationTitle,
    IsLoading,
    EmpresaList,
    InfoCard,
    ButtonNovo,
    EmpresaCard
  ],
  template: `
    <div class="flex flex-col gap-2">
      <app-navigation-title [title]="title" />
      <app-empresa-card />
      <app-button-novo (onCreate)="onCreate()" />      
      <div class="h-[60vh] relative rounded-lg flex flex-col">
        <app-is-loading [isLoading]="empresaStore.isLoading()" />
        <div class="h-[60vh] overflow-hidden">
          @if (empresaStore.list().length > 0) {
            <app-empresa-list />
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
export default class Empresa {
  title = EMPRESA;
  empresaStore = inject(EmpresaStore);

  readonly dialog = inject(MatDialog);
  onCreate() {
    const ultimoTabela = this.empresaStore.list().length + 1;
    const novo: Partial<any> = {} as any;
    this.openDialog('new', novo as any);
  }
  openDialog(opcao: string, data: any) {
    const dialogRef = this.dialog.open(EmpresaForm, {
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
      this.empresaStore.create({
        data: result as any,
      });
    });
  }
}
