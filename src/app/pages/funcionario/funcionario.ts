import { Component } from "@angular/core";
import { NavigationTitle } from "../../core/navigation/navigation-title";
import { FUNCIONARIO } from "../../core/navigation/shared/navigation-model";

@Component({
  selector: 'app-funcionario',
  imports: [NavigationTitle],
  template: ` <app-navigation-title [title]="title" /> `,
  styles: `
    :host {
      display: block;
      margin: 20px;
    }
  `,
})
export default class Funcionario {
  title = FUNCIONARIO;
}
