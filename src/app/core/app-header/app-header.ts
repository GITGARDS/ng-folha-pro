import { Component, input, output } from "@angular/core";
import { MatToolbar } from "@angular/material/toolbar";
import { AppHeaderLogo } from "./app-header-logo";

@Component({
  selector: 'app-header',
  imports: [AppHeaderLogo, MatToolbar],

  template: `
    <!-- <button type="button" aria-label="Toggle sidenav" matIconButton (click)="drawer.toggle()"> -->
    <mat-toolbar color="primary">
      <app-header-logo (onToggle)="onToggle.emit()"/>
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
  isHandset = input.required<boolean | null>();
  onToggle = output();

}
