import { DatePipe } from "@angular/common";
import { Component, inject } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

import { ButtonNovo } from "../../core/components/button-novo";
import { InfoCard } from "../../core/components/info-card";
import { IsLoading } from "../../core/components/isLoading";
import { NavigationTitle } from "../../core/navigation/navigation-title";
import { FUNCIONARIO } from "../../core/navigation/shared/navigation-model";
import FuncionarioCard from "./funcionario-card";
import { FuncionarioForm } from "./funcionario-form";
import { FuncionarioList } from "./funcionario-list/funcionario-list";
import { FuncionarioStore } from "./shared/funcionario.store";


@Component({
  selector: 'app-funcionario',
  imports: [
    NavigationTitle,
    IsLoading,
    FuncionarioList,
    FuncionarioCard,
    InfoCard,
    ButtonNovo
],
  template: `
    <div class="flex flex-col gap-2">
      <app-navigation-title [title]="title" />
      <app-funcionario-card />
      <app-button-novo (onCreate)="onCreate()"/>
      <div class="h-[60vh] relative rounded-lg flex flex-col">
        <app-is-loading [isLoading]="funcionarioStore.isLoading()" />
        <div class="h-[60vh] overflow-hidden">
          @if (funcionarioStore.list().length > 0) {
            <app-funcionario-list />
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
export default class Funcionario {
  title = FUNCIONARIO;
  funcionarioStore = inject(FuncionarioStore);

  readonly dialog = inject(MatDialog);
  onCreate() {
    const ultimoTabela = this.funcionarioStore.list().length + 1;
    const novaData = new DatePipe('en-US').transform(new Date(), 'dd-MM-yyyy');
    const novo: Partial<any> = {
      departamento: 'departamento 1',
      nome: `Funcionario ${ultimoTabela}`,
      dataNascimento: novaData,
      nacionalidade: 'Brasileira',
      naturalidade: 'Brasília',
      racaCor: 'Branca',
      estadoCivil: 'Solteiro',
      dataAdmissao: novaData,
      salarioBase: ultimoTabela * 1000,
    } as any;
    this.openDialog('new', novo as any);
  }
  openDialog(opcao: string, data: any) {
    const dialogRef = this.dialog.open(FuncionarioForm, {
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
      this.funcionarioStore.create({
        data: result as any,
      });
    });
  }
}
