import { Component, inject } from "@angular/core";
import { GenericsTables } from "../../../shared/generics/generics.tables";
import { ProdesForm } from "../prodes-form";
import { DISPLAYED_COLUMNS_PRODES, ProdesModel } from "../shared/prodes.model";
import { ProdesStore } from "../shared/prodes.store";

@Component({
  selector: 'app-prodes-list',
  imports: [],
  template: ``,
  styles: ``,
})
export class ProdesList extends GenericsTables<ProdesModel> {
  constructor() {
    super(inject(ProdesStore), DISPLAYED_COLUMNS_PRODES, ProdesForm);
  }
}
