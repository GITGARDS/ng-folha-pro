import { Component, signal } from "@angular/core";
import { Navigation } from "./core/navigation/navigation";

@Component({
  selector: 'app-root',
  imports: [Navigation],
  template: ` <app-navigation /> `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      min-height: 100vh;    
    }
  `,
})
export class App {
  protected readonly title = signal('ng-folha-pro');
}
