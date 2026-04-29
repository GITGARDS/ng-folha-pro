import { Component, inject } from "@angular/core";
import { MiniCard } from "../../core/mini-card";
import { ProdesStore } from "./shared/prodes.store";

@Component({
  selector: 'app-prodes-card',
  imports: [MiniCard],
  template: `
    <div class="flex flex-wrap gap-2">
      <app-mini-card
        icone="person_add"
        title="ativos"
        [valor]="prodesStore.totalAtivos().length || null"
      />
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
})
export default class ProdesCard {
  prodesStore = inject(ProdesStore);
}
