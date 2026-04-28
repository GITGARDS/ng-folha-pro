import { Component, inject, signal } from "@angular/core";
import { MatDivider } from "@angular/material/divider";
import { IsLoading } from "../../core/components/isLoading";
import { NavigationTitle } from "../../core/navigation/navigation-title";
import { PRODES } from "../../core/navigation/shared/navigation-model";
import ProdesCard from "./prodes-card";
import { ProdesList } from "./prodes-list/prodes-list";
import { ProdesStore } from "./shared/prodes.store";

@Component({
  selector: 'app-prodes',
  imports: [NavigationTitle, MatDivider, IsLoading, ProdesList, ProdesCard],
  template: `
    <div>
      <section>
        <div class="flex flex-wrap items-center">
          <app-navigation-title [title]="title" />
          <app-prodes-card />
        </div>
      </section>
      <mat-divider></mat-divider>
      <section class="relative">
        <app-is-loading [isLoading]="prodesStore.isLoading()" />
        <app-prodes-list />
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
  prodesStore = inject(ProdesStore);
}
