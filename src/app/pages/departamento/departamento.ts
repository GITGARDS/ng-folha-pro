import { Component, inject, signal } from "@angular/core";
import { MatDivider } from "@angular/material/divider";
import { IsLoading } from "../../core/components/isLoading";
import { NavigationTitle } from "../../core/navigation/navigation-title";
import { DEPARTAMENTO } from "../../core/navigation/shared/navigation-model";
import DepartamentoCard from "./departamento-card";
import { DepartamentoList } from "./departamento-list/departamento-list";
import { DepartamentoStore } from "./shared/departamento.store";

@Component({
  selector: 'app-departamento',
  imports: [NavigationTitle, MatDivider, IsLoading, DepartamentoList, DepartamentoCard],
  template: `
    <div>
      <section>
        <div class="flex flex-wrap items-center">
          <app-navigation-title [title]="title" />
          <app-departamento-card />
        </div>
      </section>
      <mat-divider></mat-divider>
      <section class="relative">
        <app-is-loading [isLoading]="departamentoStore.isLoading()" />
        <app-departamento-list />
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
export default class Departamento {
  title = DEPARTAMENTO;
  isLoading = signal<boolean>(false);
  departamentoStore = inject(DepartamentoStore);
}
