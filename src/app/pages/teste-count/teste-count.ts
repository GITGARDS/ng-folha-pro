import { Component, signal } from "@angular/core";

@Component({
  selector: 'app-teste-count',
  imports: [],

  template: `
  <p>{{ title() }}</p>
  `,
  styles: `
    :host {
      display: flex;
      gap: 2rem;
    }
  `,
})
export default class TesteCount {
  title = signal<string>('app-teste-count');
}
