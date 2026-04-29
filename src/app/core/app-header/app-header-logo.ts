import { Component, signal } from "@angular/core";
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-header-logo',
  imports: [],

  template: `
    <div class="h-8 w-8">
      <p
        class="w-full h-full flex items-center justify-center text-lg p-1 rounded-full font-bold bg-gray-900 text-white"
      >
        FP
      </p>
    </div>
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
