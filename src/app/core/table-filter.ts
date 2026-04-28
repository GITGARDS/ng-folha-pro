import { Component, output } from "@angular/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";

@Component({
  selector: 'app-table-filter',
  imports: [MatFormFieldModule, MatInput],

  template: `
    <mat-form-field>
      <mat-label>Filter</mat-label>
      <input matInput (keyup)="applyFilter.emit($event)" placeholder="Ex. abcd" #input />
    </mat-form-field>
  `,
  styles: ``,
})
export class TableFilter {
  applyFilter = output<Event>();
}
