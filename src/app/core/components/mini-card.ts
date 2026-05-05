import { Component, input, signal } from "@angular/core";
import { MatBadgeModule } from "@angular/material/badge";
import { MatIcon } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";

@Component({
  selector: 'app-mini-card',
  imports: [MatIcon, MatBadgeModule, MatTooltipModule],
  template: `
    @if (valor2() !== false) {
      <mat-icon [matBadge]="valor()" [matTooltip]="title()">{{ icone() }}</mat-icon>
    } @else {
      <div class="animate-spin size-6 flex items-center justify-center">
        <mat-icon>change_circle</mat-icon>
      </div>
    }
  `,
  styles: `
    :host {
      display: block;
    }
  `,
})
export class MiniCard {
  icone = input.required<string>();
  title = input.required<string>();
  valor = input.required<any>();
  valor2 = signal<any>(false);

  constructor() {
    setTimeout(() => {
      this.valor2.set(this.valor());
    }, 200);
  }
}
