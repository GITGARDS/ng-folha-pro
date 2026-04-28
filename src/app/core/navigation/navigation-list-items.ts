import { Component, input } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { RouterLink } from "@angular/router";
import { NavigationModel } from "./shared/navigation-model";

@Component({
  selector: 'app-navigation-list-items',
  imports: [MatListModule, MatIconModule, RouterLink],

  template: `
    <mat-nav-list>
      @for (item of navigationList(); track $index) {
        <a mat-list-item [routerLink]="item.url">
          <mat-icon matListItemIcon>{{ item.icon }}</mat-icon>
          <span matListItemTitle>
            {{ item.label }}
          </span>
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
  navigationList = input.required<NavigationModel[]>();
}
