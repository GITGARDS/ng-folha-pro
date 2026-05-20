import { Component, input } from "@angular/core";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-is-loading',
  imports: [MatIcon],

  template: `
    @let bgFundo = 'bg-white';
    @if (isLoading()) {
      <div class="absolute w-full h-[50vh] z-299 flex items-center justify-center p-2 rounded-lg" [class]="bgFundo">
        <div class="size-30 flex items-center justify-center animate-spin">
          <mat-icon class="!w-auto !h-auto !text-6xl !text-black">autorenew</mat-icon>
        </div>
      </div>
    }
  `,
  styles: ``,
})
export class IsLoading {
  isLoading = input.required<boolean>();
}
