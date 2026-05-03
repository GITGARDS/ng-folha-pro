import { MatTooltipModule } from "@angular/material/tooltip";
import { Component, inject, signal } from "@angular/core";
import { MatIconButton } from "@angular/material/button";
import { MatBadgeModule } from "@angular/material/badge";
import { MatMenuModule } from "@angular/material/menu";
import { MatDivider } from "@angular/material/divider";
import { MatIcon } from "@angular/material/icon";

import { FuncionarioStore } from "../../pages/funcionario/shared/funcionario.store";
import { EmpresaStore } from "../../pages/empresa/shared/empresa.store";


@Component({
  selector: 'app-header-auth-empre',

  imports: [MatMenuModule, MatIcon, MatIconButton, MatDivider, MatTooltipModule, MatBadgeModule],

  template: `
    <button
      matIconButton
      [matMenuTriggerFor]="menu"
      aria-label="Example icon-button with a menu"
      [matTooltip]="empresaStore.empresaLogada()?.nomeEmpresaRazaoSocial"
      [matBadge]="totalAtivos() === null ? '0' : totalAtivos()"
    >
      @if (totalAtivos() === null) {
        <div class="animate-spin flex items-center justify-center">
          <mat-icon>autorenew</mat-icon>
        </div>
      } @else {
        <mat-icon>account_circle</mat-icon>
      }
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
  totalAtivos = signal<number | null>(null);

  constructor() {
    setTimeout(() => {
      this.totalAtivos.set(this.funcionarioStore.totalAtivos().length);
    }, 700);
  }
}
