import { Component, input, output, signal } from "@angular/core";
import { MatIconButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { MatToolbar } from "@angular/material/toolbar";
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-header-logo',
  imports: [MatToolbar, MatIcon, MatIconButton],

  template: `
    <!-- <button type="button" aria-label="Toggle sidenav" matIconButton (click)="drawer.toggle()"> -->
    <mat-toolbar color="primary">
      <button type="button" aria-label="Toggle sidenav" matIconButton (click)="onToggle.emit()">
        <mat-icon aria-label="Side nav toggle icon">menu</mat-icon>
      </button>
      <div class="flex gap-2">
        @if (isHandset()) {
          <span></span>
        } @else {
          <p>FP</p>
          <span>{{ title() }}</span>
        }
      </div>
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
export class AppHeaderLogo {
  title = signal<string>('');
  isHandset = input.required<boolean>();
  onToggle = output();


  constructor(private stitle: Title) {
    this.title.set(stitle.getTitle());    
  }
}
