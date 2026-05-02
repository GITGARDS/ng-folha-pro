import { Component, inject } from "@angular/core";
import { GenericsTables } from "../../../shared/generics/generics.tables";
import { DepartamentoForm } from "../departamento-form";
import { DISPLAYED_COLUMNS_DEPARTAMENTO, DepartamentoModel } from "../shared/departamento.model";
import { DepartamentoStore } from "../shared/departamento.store";

@Component({
  selector: 'app-departamento-list',
  imports: [],
  template: ``,
  styles: ``,
})
export class DepartamentoList extends GenericsTables<DepartamentoModel> {
  constructor() {
    super(inject(DepartamentoStore), DISPLAYED_COLUMNS_DEPARTAMENTO, DepartamentoForm);
  }
}
