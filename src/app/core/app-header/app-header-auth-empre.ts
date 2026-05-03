import { Component, inject } from "@angular/core";
import { MatBadgeModule } from "@angular/material/badge";
import { MatIconButton } from "@angular/material/button";
import { MatDivider } from "@angular/material/divider";
import { MatIcon } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatTooltipModule } from "@angular/material/tooltip";
import { EmpresaStore } from "../../pages/empresa/shared/empresa.store";
import { FuncionarioStore } from "../../pages/funcionario/shared/funcionario.store";

@Component({
  selector: 'app-header-auth-empre',

  imports: [MatMenuModule, MatIcon, MatIconButton, MatDivider, MatTooltipModule, MatBadgeModule],

  template: `
    <button
      matIconButton
      [matMenuTriggerFor]="menu"
      aria-label="Example icon-button with a menu"
      [matTooltip]="empresaStore.empresaLogada()?.nomeEmpresaRazaoSocial"
      [matBadge]="funcionarioStore.totalAtivos().length"
    >
      <mat-icon>account_circle</mat-icon>
    </button>

    <mat-menu #menu="matMenu">
      <div class="p-2">
        <h1>{{ empresaStore.empresaLogada()?.nomeEmpresaRazaoSocial }}</h1>
        <p>{{ empresaStore.empresaLogada()?.email }}</p>
      </div>
      <mat-divider />
      <button mat-menu-item (click)="empresaStore.logout()">
        <mat-icon>logout</mat-icon>
        <span>Logout</span>
      </button>
    </mat-menu>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
})
export class AppHeaderAuthEmpre {
  funcionarioStore = inject(FuncionarioStore);
  empresaStore = inject(EmpresaStore);
}
