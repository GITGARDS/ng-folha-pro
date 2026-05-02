import { Component } from "@angular/core";
import { TablesGenerics } from "../../../shared/forms/tables.generics";
import { FuncionarioForm } from "../funcionario-form";
import { DISPLAYED_COLUMNS_FUNCIONARIO, FuncionarioModel } from "../shared/funcionario.model";
import { FuncionarioStore } from "../shared/funcionario.store";

@Component({
  selector: 'app-funcionario-list',
  imports: [],
  template: ``,
  styles: ``,
})
export class FuncionarioList extends TablesGenerics<FuncionarioModel> {
  constructor() {
    super(FuncionarioStore, DISPLAYED_COLUMNS_FUNCIONARIO, FuncionarioForm);
  }
}
