import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { AsyncPipe } from "@angular/common";
import { Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { RouterOutlet } from "@angular/router";
import { Observable } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { AppHeader } from "../app-header/app-header";
import { NavigationList } from "./navigation-list";
import { NavigationLoading } from "./navigation-loading";

@Component({
  selector: 'app-navigation',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
    RouterOutlet,
    AppHeader,
    NavigationList,
    NavigationLoading
  ],

  template: `
    <mat-sidenav-container class="sidenav-container">
      <mat-sidenav
        #drawer
        class="sidenav !transition-transform !ease-in-out !duration-700"
        [style.width]="(isHandset$ | async) === true ? '60px' : 'auto'"
        [attr.role]="(isHandset$ | async) ? 'dialog' : 'navigation'"
        [mode]="(isHandset$ | async) ? 'over' : 'side'"
        [opened]="(isHandset$ | async) === false"
      >
        @if (isHandset$ | async) {
          <div class="flex items-center justify-center p-2">
            <button
              type="button"
              aria-label="Toggle sidenav"
              matIconButton
              (click)="drawer.toggle()"
            >
              <mat-icon aria-label="Side nav toggle icon">menu</mat-icon>
            </button>
          </div>
        }

        <app-navigation-list
          [isHandset]="(isHandset$ | async) ? true : false"
          (drawerToggle)="drawer.toggle()"
        />
      </mat-sidenav>
      <mat-sidenav-content>
        <app-header
          [isHandset]="(isHandset$ | async) ? true : false"
          (drawerToggle)="drawer.toggle()"
        />
        <!-- Add Content Here -->
        <div class="p-4">
          <router-outlet>
            <app-navigation-loading />
          </router-outlet>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: `
    .sidenav-container {
      height: 100%;
    }

    .sidenav {
      width: 200px;
    }

    .sidenav .mat-toolbar {
      background: inherit;
    }

    .mat-toolbar.mat-primary {
      position: sticky;
      top: 0;
      z-index: 1;
    }
  `,
})
export class Navigation {
  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay(),
  );
}
