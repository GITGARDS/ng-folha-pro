import { Component, input } from "@angular/core";
import { MatBadgeModule } from "@angular/material/badge";
import { MatIcon } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";

@Component({
  selector: 'app-mini-card',
  imports: [MatIcon, MatBadgeModule, MatTooltipModule],
  template: `
    @if (valor() !== null) {
      <mat-icon
        [matBadge]="valor()"
        matBadgeSize="large"
        [matTooltip]="title()"
        class="!text-[var(--var-fundo)]"
        >{{ icone() }}</mat-icon
      >
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
  valor = input<string | number | null>(null);
}
