import { Component, input } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'app-is-loading',
  imports: [MatIconModule],

  template: `
    @let bgFundo = 'bg-white';
    @let textFundo = 'bg-gray-200';
    @if (isLoading()) {
      <div
        class="absolute w-full h-[calc(100vh-160px)] z-299 rounded-lg overflow-hidden"
        [class]="bgFundo"
      >
        <div class="animate-pulse">
          <div class="w-full h-full bg-sky-200">
            <div class="grid grid-cols-7 gap-6 p-2">
              <div class="col-span-2 w-full h-full">
                <div class="flex items-center justify-center h-full w-full">
                  <div class="h-20 w-20 rounded-full bg-gray-400"></div>
                </div>
              </div>
              <div class="col-span-5 h-full w-full">
                <div class="grid grid-cols-8 gap-6 p-2">
                  <div class="col-span-8 h-6 w-full" [class]="textFundo"></div>
                  <div class="col-span-5 h-6 w-full" [class]="textFundo"></div>
                  <div class="col-span-3 h-6 w-full" [class]="textFundo"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex flex-col gap-8 p-4">
            @for (item of [1, 2, 3, 4]; track $index) {
              <div class="flex flex-col gap-2">
                <div class="grid grid-cols-3 w-full h-20 gap-6">
                  <div class="col-span-1 h-full" [class]="textFundo"></div>
                  <div class="col-span-2 h-full">
                    <div class="h-full flex flex-col justify-between gap-2">
                      <div class="h-6 w-full" [class]="textFundo"></div>
                      @for (item of [1, 2, 3]; track $index) {
                        <div class="h-2 w-full" [class]="textFundo"></div>
                      }
                    </div>
                  </div>
                </div>

                <div class="grid grid-cols-5 w-full h-6">
                  <div class="col-span-4 h-full bg-purple-400/50"></div>
                </div>

                <div class="grid grid-cols-5 w-full h-5">
                  <div class="col-span-3 h-full bg-emerald-400/50"></div>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    }
    <!-- @if (isLoading()) {
      <div class="absolute border border-gray-300 w-full h-full bg-white z-10 rounded-lg overflow-hidden">
        <div class="h-full w-full flex items-center justify-center">
          <div class="h-full w-full flex items-center justify-center">
            <mat-icon class="!w-full !h-full !text-[400px] !flex !items-center !justify-center animate-spin !text-gray-200">refresh</mat-icon>
          </div>
        </div>
      </div>
    } -->
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
