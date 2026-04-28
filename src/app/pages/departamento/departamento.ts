import { Component, inject, signal } from "@angular/core";
import { MatDivider } from "@angular/material/divider";
import { IsLoading } from "../../core/components/isLoading";
import { NavigationTitle } from "../../core/navigation/navigation-title";
import { DEPARTAMENTO } from "../../core/navigation/shared/navigation-model";
import { DepartamentoList } from "./departamento-list/departamento-list";
import { DepartamentoStore } from "./shared/departamento.store";

@Component({
  selector: 'app-departamento',
  imports: [NavigationTitle, MatDivider, IsLoading, DepartamentoList],
  template: `
    <div>
      <section>
        <app-navigation-title [title]="title" />
      </section>
      <mat-divider></mat-divider>
      <section class="relative">
        <app-is-loading [isLoading]="departamentoStore.isLoading()" />
      </section>
      <section>
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
