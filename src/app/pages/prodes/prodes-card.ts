import { Component, inject } from "@angular/core";
import { MiniCard } from "../../core/components/mini-card";
import { ProdesStore } from "./shared/prodes.store";

@Component({
  selector: 'app-prodes-card',
  imports: [MiniCard],
  template: `
    <div class="flex flex-wrap gap-2">
      <app-mini-card
        icone="person_add"
        title="ativos"
        [valor]="this.prodesStore.totalAtivos().length"
        bg="bg-linear-to-b from-blue-400 via-blue-600 to-blue-800"
        text="text-white"
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
