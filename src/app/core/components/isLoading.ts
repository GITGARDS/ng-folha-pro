import { Component, input } from "@angular/core";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-is-loading',
  imports: [MatIcon],

  template: `
    @let bgFundo = 'bg-white';

    @if (isLoading()) {
      <div class="absolute w-full h-[calc(100vh)] z-299 rounded-lg p-2" [class]="bgFundo">
        <div class="w-full h-full flex justify-center pt-20">
          <div class="size-30 flex items-center justify-center animate-spin">
            <mat-icon class="!w-auto !h-auto !text-6xl !text-shadow-lg !text-green-600">autorenew</mat-icon>
          </div>
        </div>
      </div>
    }
  `,
  styles: `
    :host {
      display: block;
    }
  `,
})
export class IsLoading {
  isLoading = input.required<boolean>();
}
