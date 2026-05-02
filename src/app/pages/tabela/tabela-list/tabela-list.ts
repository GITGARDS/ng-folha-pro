import { Component, inject } from "@angular/core";
import { GenericsTables } from "../../../shared/generics/generics.tables";
import { DISPLAYED_COLUMNS_TABELA, TabelaModel } from "../shared/tabela.model";
import { TabelaStore } from "../shared/tabela.store";
import { TabelaForm } from "../tabela-form";

@Component({
  selector: 'app-tabela-list',
  imports: [],
  template: ``,
  styles: ``,
})
export class TabelaList extends GenericsTables<TabelaModel> {
  constructor() {
    super(inject(TabelaStore), DISPLAYED_COLUMNS_TABELA, TabelaForm);
  }
}
