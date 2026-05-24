import { TitleCasePipe } from "@angular/common";
import { AfterViewInit, Component, effect, input, viewChild } from "@angular/core";
import { MatBadgeModule } from "@angular/material/badge";
import { MatCardModule } from "@angular/material/card";
import { MatIcon } from "@angular/material/icon";
import { CountUp } from "countup.js";

@Component({
  selector: 'app-mini-card',
  imports: [MatIcon, MatBadgeModule, MatCardModule, TitleCasePipe],
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
          @if (valor() !== false) {
            <div class="font-bold" id="myCountUp">
              {{ valor() }}
            </div>
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
export class MiniCard implements AfterViewInit {
  icone = input.required<string>();
  title = input.required<string>();
  valor = input<number | boolean>(false);
  bg = input<string>('bg-blue-900');
  text = input<string>('text-gray-100');

  countUpRef = viewChild('myCountUp');

  constructor() {
    effect(() => {
      this.onCountUp(this.valor() as number | 0);
    });
  }
  ngAfterViewInit(): void {
    this.onCountUp(this.valor() as number | 0);
  }
  onCountUp(valor: number) {
    const novoCountUp = new CountUp('myCountUp', valor, { duration: 2 });
    novoCountUp.start();
  }
}
