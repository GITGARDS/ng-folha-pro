import { Component } from "@angular/core";
import { NavigationTitle } from "../../core/navigation/navigation-title";
import { DEPARTAMENTO } from "../../core/navigation/shared/navigation-model";

@Component({
  selector: 'app-departamento',
  imports: [NavigationTitle],
  template: ` <app-navigation-title [title]="title" /> `,
  styles: `
    :host {
      display: block;
      margin: 20px;
    }
  `,
})
export default class Departamento {
  title = DEPARTAMENTO;
}
