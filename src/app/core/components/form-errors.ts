import { Component, input } from "@angular/core";
import { MatError } from "@angular/material/input";

@Component({
  selector: 'app-form-errors',
  imports: [MatError],
  template: `
    @for (error of errors(); track error) {
      <mat-error
        ><strong>{{ error.message }}</strong></mat-error
      >
    }
  `,
  styles: ``,
})
export class FormErrors {
  errors = input<any[]>([]);
}
