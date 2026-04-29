import { Component, inject, input } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatListItem, MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatTooltipModule } from "@angular/material/tooltip";
import { Router, RouterLink } from "@angular/router";
import { NavigationModel } from "./shared/navigation-model";

@Component({
  selector: 'app-navigation-list-item',
  imports: [MatListModule, MatIconModule, RouterLink, MatTooltipModule, MatMenuModule, MatListItem],

  template: `
    <mat-list-item
      [activated]="router.url === navigationListItem().url"
      [routerLink]="navigationListItem().url"
      [matTooltip]="isHandset() ? navigationListItem().label : ''"
      matTooltipPosition="right"
    >
      <mat-icon matListItemIcon>{{ navigationListItem().icon }}</mat-icon>
      <span matListItemTitle>
        {{ navigationListItem().label }}
      </span>
    </mat-list-item>
  `,
  styles: `
    :host * {
      transition: all 1s ease-in-out;
    }
  `,
})
export class NavigationListItem {
  isHandset = input.required<boolean>();
  navigationListItem = input.required<NavigationModel>();
  router = inject(Router);
}
