import { Component } from "@angular/core";
import { NavigationTitle } from "../../core/navigation/navigation-title";
import { PRODES } from "../../core/navigation/shared/navigation-model";

@Component({
  selector: 'app-prodes',
  imports: [NavigationTitle],
  template: ` <app-navigation-title [title]="title" /> `,
  styles: `
    :host {
      display: block;
      margin: 20px;
    }
  `,
})
export default class Prodes {
  title = PRODES;
}
