import { Component, inject } from "@angular/core";
import { GenericsList } from "../../../shared/generics/generics.list";
import { EmpresaForm } from "../empresa-form";
import { DISPLAYED_COLUMNS_EMPRESA } from "../shared/empresa.model";
import { EmpresaStore } from "../shared/empresa.store";

@Component({
  selector: 'app-empresa-list',
  imports: [GenericsList],
  template: `
    <app-generics-list [iStore]="store" [iForm]="form" [iColumns]="columns" />
  `,
  styles: ``,
})
export class EmpresaList {
  store = inject(EmpresaStore);
  form = EmpresaForm;
  columns = DISPLAYED_COLUMNS_EMPRESA;  
}
