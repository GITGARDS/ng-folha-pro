import { Component, inject, input } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { Router, RouterLink } from "@angular/router";
import { NavigationModel } from "./shared/navigation-model";
import { NavigationService } from "./shared/navigation.service";

@Component({
  selector: 'app-navigation-list-items',
  imports: [MatListModule, MatIconModule, RouterLink],

  template: `
    <mat-nav-list>
      @for (item of navigationList(); track $index) {
        <a
          mat-list-item
          [activated]="router.url === item.url"
          [routerLink]="item.url"
          (click)="isHandset() && navigationService.navigationToogle.set(false)"
        >
          <mat-icon matListItemIcon>{{ item.icon }}</mat-icon>
          @if (!isHandset()) {
            <span matListItemTitle>
              {{ item.label }}
            </span>
          }
        </a>
      }
    </mat-nav-list>
  `,
  styles: `
    mat-nav-list {
      width: 100%;
    }
  `,
})
export class NavigationListItems {
  isHandset = input.required<boolean>();
  navigationService = inject(NavigationService);
  navigationList = input.required<NavigationModel[]>();
  router = inject(Router);
}
