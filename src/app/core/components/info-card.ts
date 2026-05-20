import { Component, signal } from "@angular/core";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-info-card',
  imports: [MatIcon],

  template: `
    <div class="h-full flex items-center justify-center">
      <div class="size-30 flex items-center justify-center">
        <mat-icon
          class="!h-full !w-full !text-6xl !text-gray-400 !flex !items-center !justify-center"
          >info</mat-icon
        >
      </div>
    </div>
  `,
  styles: ``,
})
export class InfoCard {
  title = signal<string>('app-class-default');
}
