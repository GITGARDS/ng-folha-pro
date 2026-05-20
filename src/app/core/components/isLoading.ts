import { Component, input } from "@angular/core";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-is-loading',
  imports: [MatIcon],

  template: `
    @if (isLoading()) {
      <div class="absolute inset-0 bg-blue-900/10 backdrop-blur-xs w-full h-[60vh] z-299 flex items-center justify-center p-2 rounded-lg border-4 border-gray-200" >
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
