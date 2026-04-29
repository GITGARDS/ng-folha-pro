import { Component, inject, signal } from "@angular/core";
import { IsLoading } from "../../core/components/isLoading";
import { NavigationTitle } from "../../core/navigation/navigation-title";
import { DEPARTAMENTO } from "../../core/navigation/shared/navigation-model";
import DepartamentoCard from "./departamento-card";
import { DepartamentoList } from "./departamento-list/departamento-list";
import { DepartamentoStore } from "./shared/departamento.store";

@Component({
  selector: 'app-departamento',
  imports: [NavigationTitle, IsLoading, DepartamentoList, DepartamentoCard],
  template: `
    <section>
      <div class="flex flex-wrap items-center">
        <app-navigation-title [title]="title" />
        <app-departamento-card />
      </div>
    </section>
    <section class="h-[calc(100vh-200px)] relative">
      <app-is-loading [isLoading]="departamentoStore.isLoading()" />
      <app-departamento-list />
    </section>
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
