import { Component, inject } from "@angular/core";
import { IList } from "../../../core/shared/generics/i.list";
import { EmpresaForm } from "../empresa-form";
import { EMPRESA_COLUMNS_ACTIONS, EMPRESA_DISPLAYED_COLUMNS } from "../shared/empresa.model";
import { EmpresaStore } from "../shared/empresa.store";

@Component({
  selector: 'app-empresa-list',
  imports: [IList],
  template: `
    <app-generics-list [iStore]="store" [iForm]="form" [iColumns]="columns" [iActions]="actions" />
  `,
  styles: ``,
})
export class EmpresaList {
  store = inject(EmpresaStore);
  form = EmpresaForm;
  columns = EMPRESA_DISPLAYED_COLUMNS;
  actions = EMPRESA_COLUMNS_ACTIONS;  
}
