import { Component, inject } from "@angular/core";
import { GenericsList } from "../../../shared/generics/generics.list";
import { DepartamentoForm } from "../departamento-form";
import { DISPLAYED_COLUMNS_DEPARTAMENTO } from "../shared/departamento.model";
import { DepartamentoStore } from "../shared/departamento.store";

@Component({
  selector: 'app-departamento-list',
  imports: [GenericsList],
  template: `
    <app-generics-list [iStore]="store" [iFormDialog]="form" [iDisplayedColumns]="colunas" />
  `,
  styles: ``,
})
export class DepartamentoList {
  store = inject(DepartamentoStore);
  form = DepartamentoForm;
  colunas = DISPLAYED_COLUMNS_DEPARTAMENTO;  
}
