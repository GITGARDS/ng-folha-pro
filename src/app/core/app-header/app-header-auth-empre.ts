import { Component, effect, inject, signal } from "@angular/core";
import { MatBadgeModule } from "@angular/material/badge";
import { MatIconButton } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIcon } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatTooltipModule } from "@angular/material/tooltip";
import { EmpresaStore } from "../../pages/empresa/shared/empresa.store";
import { FuncionarioStore } from "../../pages/funcionario/shared/funcionario.store";

@Component({
  selector: 'app-header-auth-empre',

  imports: [MatMenuModule, MatIcon, MatIconButton, MatTooltipModule, MatBadgeModule, MatCardModule],

  template: `
    <!-- <div class="animate-spin flex items-center justify-center"> -->
    <!-- <mat-icon>donut_large</mat-icon> -->
    <!-- <mat-icon>donut_small</mat-icon> -->
    <!-- <mat-icon>flip_camera_android</mat-icon> -->
    <!-- <mat-icon>light_mode</mat-icon> -->
    <!-- <mat-icon>public</mat-icon> -->
    <!-- <mat-icon>radar</mat-icon> -->
    <!-- <mat-icon>timelapse</mat-icon> -->
    <!-- <mat-icon>update</mat-icon> -->

    <!-- </div> -->

    <button
      matIconButton
      [matMenuTriggerFor]="menu"
      aria-label="Example icon-button with a menu"
      [matTooltip]="empresaStore.empresaLogada()?.nomeEmpresaRazaoSocial"
      [matBadge]="totalAtivos() === null ? '0' : totalAtivos()"
    >
      @if (totalAtivos() === null) {
        <div class="animate-spin flex items-center justify-center">
          <!-- <mat-icon>change_circle</mat-icon> -->
          <mat-icon>flip_camera_android</mat-icon>
        </div>
      } @else {
        <mat-icon>account_circle</mat-icon>
      }
    </button>

    <mat-menu #menu="matMenu">
      <div class="p-2">
        <mat-card class="overflow-hidden" appearance="outlined">
          <mat-card-header>
            <mat-card-title>{{ empresaStore.empresaLogada()?.id }}</mat-card-title>
            <mat-card-subtitle>{{
              empresaStore.empresaLogada()?.nomeEmpresaRazaoSocial
            }}</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <div class="flex flex-col">
              <span>Inscricao: {{ empresaStore.empresaLogada()?.inscricao }}</span>
              <span>Email: {{ empresaStore.empresaLogada()?.email }}</span>
              <span>Telefone:{{ empresaStore.empresaLogada()?.telefone }}</span>
              <span>Cnae: {{ empresaStore.empresaLogada()?.cnae }}</span>
              <span>Fpas: {{ empresaStore.empresaLogada()?.fpas }}</span>
            </div>
          </mat-card-content>
          <mat-card-actions>
            <button mat-menu-item (click)="empresaStore.logout()">
              <mat-icon>logout</mat-icon>
              <span>Logout</span>
            </button>
          </mat-card-actions>
        </mat-card>
      </div>
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
    effect(() => {
      this.totalAtivos.set(this.funcionarioStore.totalAtivos().length);      
    })
  }
}
