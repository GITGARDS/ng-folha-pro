import { Component, signal } from "@angular/core";
import { MatDivider } from "@angular/material/divider";
import { IsLoading } from "../../core/components/isLoading";
import { NavigationTitle } from "../../core/navigation/navigation-title";
import { FUNCIONARIO } from "../../core/navigation/shared/navigation-model";

@Component({
  selector: 'app-funcionario',
  imports: [NavigationTitle, MatDivider, IsLoading],
  template: `
    <div>
      <section>
        <app-navigation-title [title]="title" />
      </section>
      <mat-divider></mat-divider>
      <section class="relative">
        <app-is-loading [isLoading]="isLoading()" />
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
export default class Funcionario {
  title = FUNCIONARIO;
  isLoading = signal<boolean>(false);
}
