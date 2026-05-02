import { Component, inject } from "@angular/core";
import { GenericsList } from "../../../shared/generics/generics.list";
import { TABELA_COLUMNS_ACTIONS, TABELA_DISPLAYED_COLUMNS } from "../shared/tabela.model";
import { TabelaStore } from "../shared/tabela.store";
import { TabelaForm } from "../tabela-form";

@Component({
  selector: 'app-tabela-list',
  imports: [GenericsList],
  template: `
    <app-generics-list [iStore]="store" [iForm]="form" [iColumns]="columns" [iActions]="actions" />
  `,
  styles: ``,
})
export class TabelaList {
  store = inject(TabelaStore);
  form = TabelaForm;
  columns = TABELA_DISPLAYED_COLUMNS;
  actions = TABELA_COLUMNS_ACTIONS;
}
