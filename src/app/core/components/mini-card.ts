import { TitleCasePipe } from "@angular/common";
import { Component, input, signal } from "@angular/core";
import { MatBadgeModule } from "@angular/material/badge";
import { MatCardModule } from "@angular/material/card";
import { MatIcon } from "@angular/material/icon";
import { TIME_DELAY } from "../shared/consts";
import { CountUpDirective } from "../shared/directives/count-up.directive";

@Component({
  selector: 'app-mini-card',
  imports: [MatIcon, MatBadgeModule, MatCardModule, TitleCasePipe, CountUpDirective],
  template: `
    <mat-card appearance="filled" class="relative select-none cursor-alias">
      <div
        class="absolute flex items-center justify-center top-[-15px] left-4 rounded-sm bg-blue-700 text-white border-2 border-gray-300"
        [class]="bg() + ' ' + text()"
      >
        <mat-icon>{{ icone() }}</mat-icon>
      </div>
      <mat-card-header>
        <mat-card-title>
          <span class="text-sm">
            {{ title() | titlecase }}
          </span>
        </mat-card-title>
        <mat-card-subtitle class="self-end">
          @if (valor2() !== false) {
            <div class="font-bold" [appCountUpDirective]="valor()" [duration]="2" >{{ valor() }}</div>
          } @else {
            <div class="animate-spin size-6 flex items-center justify-center">
              <mat-icon>change_circle</mat-icon>
            </div>
          }
        </mat-card-subtitle>
      </mat-card-header>
      <mat-card-content></mat-card-content>
    </mat-card>
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
  bg = input<string>('bg-blue-900');
  text = input<string>('text-gray-100');
  valor2 = signal<any>(false);
  constructor() {
    setTimeout(() => {
      this.valor2.set(this.valor());
    }, TIME_DELAY);
  }
}
