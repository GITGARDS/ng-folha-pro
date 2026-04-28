import { Component, signal } from "@angular/core";
import { Navigation } from "./core/navigation/navigation";

@Component({
  selector: 'app-root',
  imports: [Navigation],
  template: ` <app-navigation /> `,
  styles: `
    :host {
    }
  `,
})
export class App {
  protected readonly title = signal('ng-folha-pro');
}
