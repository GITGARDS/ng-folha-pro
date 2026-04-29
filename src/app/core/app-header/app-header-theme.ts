import { Component, signal } from "@angular/core";
import { MatButtonModule, MatIconButton } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";

@Component({
  selector: 'app-header-theme',
  imports: [MatButtonModule, MatIconModule, MatMenuModule, MatIconButton],
  template: `
    <div class="h-full flex items-center justify-center lg:justify-start gap-4">
      <button mat-icon-button (click)="toggleTheme()">
        <mat-icon class="!text-[var(--var-texto)]">{{ icone() }}</mat-icon>
      </button>
    </div>
  `,
  styles: ``,
})
export class AppHeaderTheme {
  icone = signal<string>('dark_mode');

  toggleTheme() {
    if (document.body.classList.contains('light-mode')) {
      document.body.classList.remove('light-mode');
      document.body.classList.add('dark-mode');
      this.icone.set('light_mode');
    } else {
      document.body.classList.remove('dark-mode');
      document.body.classList.add('light-mode');
      this.icone.set('dark_mode');
    }
  }
}
