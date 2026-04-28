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
import { AppHeaderLogo } from "../app-header/app-header-logo";
import { NavigationListItems } from "./navigation-list-items";
import { NAVIGATION_LIST } from "./shared/navigation-model";

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
    NavigationListItems,
    AppHeader,
    AppHeaderLogo,
  ],

  template: `
    <!-- mode="over" -->
    <mat-sidenav-container class="sidenav-container">
      <mat-sidenav
        #drawer
        class="sidenav"
        fixedInViewport
        [attr.role]="(isHandset$ | async) ? 'dialog' : 'navigation'"
        [mode]="(isHandset$ | async) ? 'over' : 'side'"
        [opened]="(isHandset$ | async) === false"
      >
        @if (isHandset$ | async) {
          <app-header-logo (onToggle)="drawer.toggle()" />
        } @else {
          <mat-toolbar>Menu</mat-toolbar>
        }
        <app-navigation-list-items [navigationList]="navigationList" />
      </mat-sidenav>
      <mat-sidenav-content>
        <app-header [isHandset]="isHandset$ | async" (onToggle)="drawer.toggle()" />
        <!-- Add Content Here -->
        <router-outlet />
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
  navigationList = NAVIGATION_LIST;

  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay(),
  );
}
