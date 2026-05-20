import { Component, signal } from "@angular/core";
import { MatButton } from "@angular/material/button";
import { Title } from "@angular/platform-browser";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-header-logo',
  imports: [MatButton, RouterLink],

  template: `
    <a matButton="tonal" routerLink="/">
      <span class="font-bold">FP</span>
    </a>
  `,
  styles: `
    .flex {
      display: flex;
    }
  `,
})
export class AppHeaderLogo {
  title = signal<string>('');

  constructor(private stitle: Title) {
    this.title.set(stitle.getTitle());
  }
}
