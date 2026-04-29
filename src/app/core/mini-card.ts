import { Component, input, signal } from "@angular/core";
import { MatBadgeModule } from "@angular/material/badge";
import { MatIcon } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { interval } from "rxjs";

@Component({
  selector: 'app-mini-card',
  imports: [MatIcon, MatBadgeModule, MatTooltipModule],
  template: `
    @if (valor2() !== false) {
      <mat-icon [matBadge]="valor()" [matTooltip]="title()">{{ icone() }}</mat-icon>
    } @else {
      <div
        class="size-3.5 animate-spin border-3 border-r-transparent border-blue-600 rounded-full"
      ></div>
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
    interval(500).subscribe(() => {
      this.valor2.set(this.valor());
    });
  }
}
