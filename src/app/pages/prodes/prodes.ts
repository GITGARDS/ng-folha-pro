import { Component, inject, signal } from "@angular/core";
import { MatCard } from "@angular/material/card";
import { IsLoading } from "../../core/components/isLoading";
import { NavigationTitle } from "../../core/navigation/navigation-title";
import { PRODES } from "../../core/navigation/shared/navigation-model";
import ProdesCard from "./prodes-card";
import { ProdesList } from "./prodes-list/prodes-list";
import { ProdesStore } from "./shared/prodes.store";

@Component({
  selector: 'app-prodes',
  imports: [NavigationTitle, IsLoading, ProdesList, ProdesCard, MatCard],
  template: `
    <section>
      <div class="flex flex-wrap items-center">
        <app-navigation-title [title]="title" />
        <app-prodes-card />
      </div>
    </section>

    <section class="h-[calc(100vh-200px)] relative">
      <app-is-loading [isLoading]="prodesStore.isLoading()" />
      <app-prodes-list />
    </section>
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
