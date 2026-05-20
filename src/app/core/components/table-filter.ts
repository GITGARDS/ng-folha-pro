import { Component, output } from "@angular/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";

@Component({
  selector: 'app-table-filter',
  imports: [MatFormFieldModule, MatInput],

  template: `
    <mat-form-field appearance="outline" class="w-full sm:max-w-xs">
      <mat-label>Filter</mat-label>
      <input matInput (keyup)="applyFilter.emit($event)" placeholder="Ex. abcd" #input />
    </mat-form-field>
  `,
  styles: `
    :host {
      display: block;
      margin-top: 10px;
    }
  `,
})
export class TableFilter {
  applyFilter = output<Event>();
}
