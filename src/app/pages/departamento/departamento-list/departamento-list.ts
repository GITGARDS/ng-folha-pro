import { Component, inject } from "@angular/core";
import { IList } from "../../../core/shared/generics/i.list";
import { DepartamentoForm } from "../departamento-form";
import { DEPARTAMENTO_COLUMNS_ACTIONS, DEPARTAMENTO_DISPLAYED_COLUMNS } from "../shared/departamento.model";
import { DepartamentoStore } from "../shared/departamento.store";

@Component({
  selector: 'app-departamento-list',
  imports: [IList],
  template: `
    <app-generics-list [iStore]="store" [iForm]="form" [iColumns]="columns" [iActions]="actions" />
  `,
  styles: ``,
})
export class DepartamentoList {
  store = inject(DepartamentoStore);
  form = DepartamentoForm;
  columns = DEPARTAMENTO_DISPLAYED_COLUMNS;
  actions = DEPARTAMENTO_COLUMNS_ACTIONS;
}
