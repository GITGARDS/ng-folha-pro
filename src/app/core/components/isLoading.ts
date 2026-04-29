import { Component, input } from "@angular/core";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-is-loading',
  imports: [MatIcon],

  template: `
    @if (isLoading()) {
      <div class="absolute border border-gray-300 w-full h-full bg-white z-10 rounded-lg overflow-hidden">
        <div class="h-full w-full flex items-center justify-center">
          <div class="h-full w-full flex items-center justify-center">
            <mat-icon class="!w-full !h-full !text-[400px] !flex !items-center !justify-center animate-spin !text-gray-200">refresh</mat-icon>
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
