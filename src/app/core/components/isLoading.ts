import { Component, input } from "@angular/core";

@Component({
  selector: 'app-is-loading',
  imports: [],

  template: `
    @if (isLoading()) {
      @let eltexto = 'bg-[var(--mat-sys-surface-variant)]';
      @let animate = 'animate-pulse';
      <div class="absolute w-full h-full rounded-lg inset-0 z-300 bg-[var(--mat-sys-surface)]">
        <div [class]="animate">
          <div class="flex flex-col gap-8">
            @for (item of [1, 2]; track $index) {
              <div>
                <div class="h-10 w-1/2 rounded-lg mb-2" [class]="eltexto"></div>
                <div class="h-25 rounded-lg mb-8" [class]="eltexto"></div>

                <div class="flex flex-col gap-2">
                  @for (item of [1, 2]; track $index) {
                    <div class="flex space-x-2">
                      <div class="size-8 rounded-full" [class]="eltexto"></div>
                      <div class="flex-1 space-y-6 py-1">
                        <div class="h-2 rounded" [class]="eltexto"></div>
                        <div class="space-y-3">
                          <div class="grid grid-cols-3 gap-4">
                            <div class="col-span-2 h-2 rounded" [class]="eltexto"></div>
                            <div class="col-span-1 h-2 rounded" [class]="eltexto"></div>
                          </div>
                          <div class="h-2 rounded" [class]="eltexto"></div>
                        </div>
                      </div>
                    </div>
                  }
                </div>
              </div>
            }
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
