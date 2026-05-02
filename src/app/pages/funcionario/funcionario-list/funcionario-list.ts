import { Component, inject } from "@angular/core";
import { GenericsList } from "../../../shared/generics/generics.list";
import { FuncionarioForm } from "../funcionario-form";
import { DISPLAYED_COLUMNS_FUNCIONARIO } from "../shared/funcionario.model";
import { FuncionarioStore } from "../shared/funcionario.store";

@Component({
  selector: 'app-funcionario-list',
  imports: [GenericsList],
  template: `
    <app-generics-list [iStore]="store" [iFormDialog]="form" [iDisplayedColumns]="colunas" />
  `,
  styles: ``,
})
export class FuncionarioList {
  store = inject(FuncionarioStore);
  form = FuncionarioForm;
  colunas = DISPLAYED_COLUMNS_FUNCIONARIO;  
}
