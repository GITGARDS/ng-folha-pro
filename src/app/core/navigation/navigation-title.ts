import { Component, input } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbar } from "@angular/material/toolbar";
import { NavigationModel } from "./shared/navigation-model";

@Component({
  selector: 'app-navigation-title',
  imports: [MatIconModule, MatToolbar],

  template: `
    <mat-toolbar>
      <div class="flex gap-2">
        <mat-icon mat-list-icon>{{ title().icon }}</mat-icon>
        <h3 mat-line>{{ title().label }}</h3>
      </div>
    </mat-toolbar>
  `,
  styles: ``,
})
export class NavigationTitle {
  title = input.required<NavigationModel>();
}
