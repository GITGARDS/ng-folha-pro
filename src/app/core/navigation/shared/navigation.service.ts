import { Injectable, signal } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  navigationToogle = signal<boolean>(false);
}
