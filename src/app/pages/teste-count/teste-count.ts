import { Component, ViewChild, signal } from "@angular/core";
import { MatButton } from "@angular/material/button";
import { CountUp } from "countup.js";
import { CountUpDirective } from "../../core/shared/directives/count-up.directive";

@Component({
  selector: 'app-teste-count',
  imports: [CountUpDirective, MatButton],

  template: `
    <div class="flex flex-col">
      <span id="myCountUp" [countUp]="valor()" [duration]="2" class="border p-4 rounded-2xl"></span>
      <button matButton="filled" (click)="onReset()">reset</button>
    </div>
  `,
  styles: `
    :host {
      display: flex;
      gap: 2rem;
    }
  `,
})
export default class TesteCount {
  valor = signal<number>(5000);

  @ViewChild('myCountUp') countUpRef?: CountUpDirective
  onReset(){
    const myCountUp = new CountUp('myCountUp', 50000, { duration: 2 });
    myCountUp.start();
  }
}
