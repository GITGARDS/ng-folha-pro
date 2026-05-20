import { Component, output } from "@angular/core";
import { MatFabButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-button-novo',
  imports: [MatIcon, MatFabButton],
  template: `
    <button matFab (click)="onCreate.emit()">
      <mat-icon>add</mat-icon>
    </button>
  `,
  styles: ``,
})
export class ButtonNovo {
  onCreate = output();
}
