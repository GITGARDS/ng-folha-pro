import { Component, inject } from "@angular/core";
import { IList } from "../../../core/shared/generics/i.list";
import { FuncionarioForm } from "../funcionario-form";
import { FUNCIONARIO_COLUMNS_ACTIONS, FUNCIONARIO_DISPLAYED_COLUMNS } from "../shared/funcionario.model";
import { FuncionarioStore } from "../shared/funcionario.store";

@Component({
  selector: 'app-funcionario-list',
  imports: [IList],
  template: `
    <app-generics-list [iStore]="store" [iForm]="form" [iColumns]="columns" [iActions]="menuActions" />
  `,
  styles: ``,
})
export class FuncionarioList {
  store = inject(FuncionarioStore);
  form = FuncionarioForm;
  columns = FUNCIONARIO_DISPLAYED_COLUMNS;  
  menuActions = FUNCIONARIO_COLUMNS_ACTIONS;
}
