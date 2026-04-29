import { Component, inject, signal } from "@angular/core";
import { IsLoading } from "../../core/components/isLoading";
import { NavigationTitle } from "../../core/navigation/navigation-title";
import { FUNCIONARIO } from "../../core/navigation/shared/navigation-model";
import FuncionarioCard from "./funcionario-card";
import { FuncionarioList } from "./funcionario-list/funcionario-list";
import { FuncionarioStore } from "./shared/funcionario.store";

@Component({
  selector: 'app-funcionario',
  imports: [NavigationTitle, IsLoading, FuncionarioList, FuncionarioCard],
  template: `
    <section>
      <div class="flex flex-wrap items-center">
        <app-navigation-title [title]="title" />
        <app-funcionario-card />
      </div>
    </section>
    <section class="h-[calc(100vh-200px)] relative">
      <app-is-loading [isLoading]="funcionarioStore.isLoading()" />
      <app-funcionario-list />
    </section>
  `,
  styles: `
    :host {
      display: block;
      margin-top: 20px;
    }
  `,
})
export default class Funcionario {
  title = FUNCIONARIO;
  isLoading = signal<boolean>(false);
  funcionarioStore = inject(FuncionarioStore);
}
