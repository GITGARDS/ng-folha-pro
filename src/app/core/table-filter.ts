import { Component, output } from "@angular/core";
import { MatButton } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";

@Component({
  selector: 'app-table-filter',
  imports: [MatFormFieldModule, MatInput, MatButton],

  template: `
    <div class="flex flex-wrap items-center gap-2">
      <mat-form-field>
        <mat-label>Filter</mat-label>
        <input matInput (keyup)="applyFilter.emit($event)" placeholder="Ex. abcd" #input />
      </mat-form-field>
      <button matButton="filled" class="mt-[-20px]" (click)="onCreate.emit('new')">novo</button>
    </div>
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
  onCreate = output<string>();
}
