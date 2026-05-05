import { Component, inject } from "@angular/core";
import { IList } from "../../../core/shared/generics/i.list";
import { ProdesForm } from "../prodes-form";
import { PRODES_COLUMNS_ACTIONS, PRODES_DISPLAYED_COLUMNS } from "../shared/prodes.model";
import { ProdesStore } from "../shared/prodes.store";

@Component({
  selector: 'app-prodes-list',
  imports: [IList],
  template: `
    <app-generics-list [iStore]="store" [iForm]="form" [iColumns]="columns" [iActions]="actions" />
  `,
  styles: ``,
})
export class ProdesList {
  store = inject(ProdesStore);
  form = ProdesForm;
  columns = PRODES_DISPLAYED_COLUMNS;
  actions = PRODES_COLUMNS_ACTIONS;
}
