import { Component, output } from "@angular/core";
import { MatFabButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-button-novo',
  imports: [MatIcon, MatFabButton],
  template: `
    <div class="w-25 h-25">
      <button matFab (click)="onCreate.emit()" class="!w-full !h-full">
        <div class="flex flex-col items-center gap-2">
          <mat-icon>add</mat-icon>          
          <span>Novo</span>
        </div>
      </button>
    </div>
  `,
  styles: ``,
})
export class ButtonNovo {
  onCreate = output();
}
