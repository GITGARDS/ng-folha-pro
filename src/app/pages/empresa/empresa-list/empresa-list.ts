import { Component, inject } from "@angular/core";
import { GenericsTables } from "../../../shared/generics/generics.tables";
import { EmpresaForm } from "../empresa-form";
import { DISPLAYED_COLUMNS_EMPRESA, EmpresaModel } from "../shared/empresa.model";
import { EmpresaStore } from "../shared/empresa.store";

@Component({
  selector: 'app-empresa-list',
  imports: [],
  template: ``,
  styles: ``,
})
export class EmpresaList extends GenericsTables<EmpresaModel> {
  constructor() {
    super(inject(EmpresaStore), DISPLAYED_COLUMNS_EMPRESA, EmpresaForm);
  }
}
