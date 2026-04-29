import { Component, input } from "@angular/core";
import { MatToolbar } from "@angular/material/toolbar";
import { AppHeaderTheme } from "./app-header-theme";
import { AppHeaderTitle } from "./app-header-title";

@Component({
  selector: 'app-header',
  imports: [MatToolbar, AppHeaderTitle, AppHeaderTheme],

  template: `
    <mat-toolbar class="flex justify-between">
      @if (isHandset()) {
        <span></span>
      } @else {
        <app-header-title />
      }
      <app-header-theme />
    </mat-toolbar>
  `,
  styles: `
    mat-toolbar {
      position: sticky;
      top: 0;
      z-index: 1;
    }
  `,
})
export class AppHeader {
  isHandset = input.required<boolean>();
}
