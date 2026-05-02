import { Component, inject } from "@angular/core";
import { GenericsList } from "../../../shared/generics/generics.list";
import { DISPLAYED_COLUMNS_TABELA } from "../shared/tabela.model";
import { TabelaStore } from "../shared/tabela.store";
import { TabelaForm } from "../tabela-form";

@Component({
  selector: 'app-tabela-list',
  imports: [GenericsList],
  template: `
    <app-generics-list [iStore]="store" [iForm]="form" [iColumns]="columns" />

  `,
  styles: ``,
})
export class TabelaList {
  store = inject(TabelaStore);
  form = TabelaForm;
  columns = DISPLAYED_COLUMNS_TABELA;  
}
