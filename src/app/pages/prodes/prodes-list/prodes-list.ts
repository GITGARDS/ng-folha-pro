import { Component, inject } from "@angular/core";
import { GenericsList } from "../../../shared/generics/generics.list";
import { ProdesForm } from "../prodes-form";
import { DISPLAYED_COLUMNS_PRODES } from "../shared/prodes.model";
import { ProdesStore } from "../shared/prodes.store";

@Component({
  selector: 'app-prodes-list',
  imports: [GenericsList],
  template: `
    <app-generics-list [iStore]="store" [iFormDialog]="form" [iDisplayedColumns]="colunas" />
  `,
  styles: ``,
})
export class ProdesList {
  store = inject(ProdesStore);
  form = ProdesForm;
  colunas = DISPLAYED_COLUMNS_PRODES;  
}
