import { Component, ViewEncapsulation, inject, signal } from "@angular/core";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from "@angular/router";

@Component({
  selector: 'app-navigation-loading',
  imports: [MatProgressBarModule],

  template: `
    <div class="h-1">
      @if (isLoading()) {
        <mat-progress-bar mode="indeterminate" />
      }
    </div>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
})
export class NavigationLoading {
  private router = inject(Router);
  isLoading = signal<boolean>(false);

  constructor() {
    this.router.events.subscribe({
      next: (event) => {
        if (event instanceof NavigationStart) {
          this.isLoading.set(true);
        } else if (
          event instanceof NavigationEnd ||
          event instanceof NavigationCancel ||
          event instanceof NavigationError
        ) {
          this.isLoading.set(false);
        }
      },
    });
  }
}
