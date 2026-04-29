import { Component, input } from "@angular/core";
import { MatListModule } from "@angular/material/list";
import { NavigationListItem } from "./navigation-list-item";
import { NAVIGATION_LIST } from "./shared/navigation-model";

@Component({
  selector: 'app-navigation-list',
  imports: [NavigationListItem, MatListModule],

  template: `
    <mat-nav-list>
      @for (item of navigationList; track $index) {
        <app-navigation-list-item [isHandset]="isHandset()" [navigationListItem]="item" />
      }
    </mat-nav-list>
  `,
  styles: `
  `,
})
export class NavigationList {
  isHandset = input.required<boolean>();
  navigationList = NAVIGATION_LIST;
}
