import { Component, signal } from "@angular/core";

@Component({
  selector: 'app-class-default',
  imports: [],

  template: ` <p> {{ title() }} </p> `,
  styles: ``,
})
export class ClassDefault {
    title = signal<string>('app-class-default')
}
