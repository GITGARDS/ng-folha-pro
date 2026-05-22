import { Injectable, inject } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root',
})
export class AppService {
  _snackBar = inject(MatSnackBar);

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Fechar', {
      duration: 1000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
    });
  }
}
