import { Component, input } from "@angular/core";
import { MatToolbar } from "@angular/material/toolbar";
import { AppHeaderTitle } from "./app-header-title";

@Component({
  selector: 'app-header',
  imports: [MatToolbar, AppHeaderTitle],

  template: `
    <mat-toolbar color="primary">
      @if (isHandset()) {
      } @else {
        <app-header-title />
      }
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
