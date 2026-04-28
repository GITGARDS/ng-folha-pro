import { Component, input } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { NavigationModel } from "./shared/navigation-model";

@Component({
  selector: 'app-navigation-title',
  imports: [MatIconModule, MatListModule ],

  template: `
    <mat-list-item>
      <mat-icon mat-list-icon>{{ title().icon }}</mat-icon>
      <h3 mat-line>{{ title().label }}</h3>
    </mat-list-item>
  `,
  styles: ``,
})
export class NavigationTitle {
  title = input.required<NavigationModel>();
}
