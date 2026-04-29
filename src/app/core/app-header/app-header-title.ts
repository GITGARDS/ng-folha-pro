import { Component, signal } from "@angular/core";
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-header-title',
  imports: [],

  template: `
    <span
      class="text-2xl font-extrabold leading-none tracking-tight"
      >{{ title() }}</span
    >
  `,
  styles: `
    .flex {
      display: flex;
    }
  `,
})
export class AppHeaderTitle {
  title = signal<string>('');

  constructor(private stitle: Title) {
    this.title.set(stitle.getTitle());
  }
}
