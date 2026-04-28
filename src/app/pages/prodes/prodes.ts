import { Component, signal } from "@angular/core";
import { MatDivider } from "@angular/material/divider";
import { IsLoading } from "../../core/components/isLoading";
import { NavigationTitle } from "../../core/navigation/navigation-title";
import { PRODES } from "../../core/navigation/shared/navigation-model";

@Component({
  selector: 'app-prodes',
  imports: [NavigationTitle, IsLoading, MatDivider],
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
export default class Prodes {
  title = PRODES;
  isLoading = signal<boolean>(false);
}
