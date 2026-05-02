import { Component, inject } from "@angular/core";
import { GenericsTables } from "../../../shared/generics/generics.tables";
import { FuncionarioForm } from "../funcionario-form";
import { DISPLAYED_COLUMNS_FUNCIONARIO, FuncionarioModel } from "../shared/funcionario.model";
import { FuncionarioStore } from "../shared/funcionario.store";

@Component({
  selector: 'app-funcionario-list',
  imports: [],
  template: ``,
  styles: ``,
})
export class FuncionarioList extends GenericsTables<FuncionarioModel> {
  constructor() {
    super(inject(FuncionarioStore), DISPLAYED_COLUMNS_FUNCIONARIO, FuncionarioForm);
  }
}
