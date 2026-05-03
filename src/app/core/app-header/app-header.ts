import { Component, inject, input, output } from "@angular/core";
import { MatIconButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { MatToolbar } from "@angular/material/toolbar";
import { EmpresaService } from "../../pages/empresa/shared/empresa.service";
import { AppHeaderAuthEmpre } from "./app-header-auth-empre";
import { AppHeaderLogo } from "./app-header-logo";
import { AppHeaderTheme } from "./app-header-theme";
import { AppHeaderTitle } from "./app-header-title";

@Component({
  selector: 'app-header',
  imports: [
    MatToolbar,
    AppHeaderTitle,
    AppHeaderTheme,
    AppHeaderLogo,
    MatIconButton,
    MatIcon,
    AppHeaderAuthEmpre,
  ],

  template: `
    <mat-toolbar class="flex items-center justify-between gap-2">
      <div class="flex items-center gap-2">
        @if (isHandset()) {
          <button
            type="button"
            aria-label="Toggle sidenav"
            matIconButton
            (click)="drawerToggle.emit()"
          >
            <mat-icon aria-label="Side nav toggle icon">menu</mat-icon>
          </button>
        }
        <div class="flex items-center gap-2">
          <app-header-logo />
          @if (isHandset()) {
            <span></span>
          } @else {
            <app-header-title />
          }
        </div>
      </div>

      @if (empresaService.idEmpresaLogada() !== null) {
        <app-header-auth-empre />
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
  empresaService = inject(EmpresaService);
  isHandset = input.required<boolean>();
  drawerToggle = output<void>();
}
