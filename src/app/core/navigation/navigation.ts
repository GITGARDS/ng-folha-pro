import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { AsyncPipe, CommonModule } from "@angular/common";
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
import { NavigationList } from "./navigation-list";

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
    NavigationList,
    AppHeader,
    CommonModule,
    AppHeaderLogo,
  ],

  template: `
    <!-- mode="over" -->
    <mat-sidenav-container class="sidenav-container">
      <mat-sidenav
        #drawer
        class="sidenav"
        [style.width]="(isHandset$ | async) === true ? '60px' : 'auto'"
        fixedInViewport
        [attr.role]="(isHandset$ | async) ? 'dialog' : 'navigation'"
        mode="side"
        opened="true"
      >
        <app-header-logo />
        <app-navigation-list [isHandset]="(isHandset$ | async) ? true : false" />
      </mat-sidenav>
      <mat-sidenav-content>
        <app-header
          [isHandset]="(isHandset$ | async) ? true : false"
          (onToggle)="drawer.toggle()"
        />
        <!-- Add Content Here -->
        <div class="p-2">
          <div class="p-2 border border-gray-200 rounded-lg h-full">
            <router-outlet />
          </div>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: `
    .sidenav-container {
      height: 100%;
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
    map((result) => {
      console.log(' isHandset', result.matches);
      // this.navigationService.navigationToogle.set(result.matches);
      return result.matches;
    }),
    shareReplay(),
  );
}
