import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButton } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDivider } from "@angular/material/divider";
import { MatError, MatFormField, MatInputModule, MatLabel } from "@angular/material/input";

/**
 * @title Dialog with header, scrollable content and actions
 */
@Component({
  selector: 'app-tabela-form',
  imports: [
    MatButton,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormField,
    MatInputModule,
    MatError,
    MatLabel,
    MatCardModule,
    MatDivider,
  ],
  template: `
    <div class="gap-2 h-full flex flex-col justify-between">
      <mat-card class="p-2 h-full" appearance="outlined">
        <mat-card>
          <mat-card-header>
            <mat-card-title>INSS</mat-card-title>
            <mat-card-subtitle>sub-header</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <form [formGroup]="dataForm">
              <div class="mt-2">
                <div class="grid grid-cols-6 gap-2">
                  <mat-form-field class="col-span-4" [appearance]="formAparence">
                    <mat-label>Id</mat-label>
                    <input readonly matInput formControlName="id" />
                  </mat-form-field>
                </div>
                <div class="grid grid-cols-6 gap-2">
                  <mat-form-field class="col-span-6" [appearance]="formAparence">
                    <mat-label>Nome</mat-label>
                    <input matInput formControlName="nome" />
                    @if (dataForm.controls['nome'].hasError('required')) {
                      <mat-error><strong>Campo requerido</strong></mat-error>
                    }
                  </mat-form-field>
                </div>
              </div>
            </form>
          </mat-card-content>
        </mat-card>
        <mat-divider></mat-divider>
        <mat-card>
          <mat-card-header>
            <mat-card-title>IRRF</mat-card-title>
          </mat-card-header>
          <mat-card-content> </mat-card-content>
        </mat-card>
      </mat-card>

      <section>
        <button matButton="tonal">Cancel</button>
        <button matButton="filled" [disabled]="dataForm.invalid" (click)="onSubmit()">
          Confirma
        </button>
      </section>
    </div>
  `,

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabelaForm {
  formAparence: 'fill' | 'outline' = 'fill';

  ngOnInit() {
    this.dataForm.patchValue({});
    this.dataForm.markAllAsTouched();
    this.dataForm.markAsDirty();
  }

  private fb = inject(FormBuilder);

  dataForm = this.fb.group({
    id: [{ value: '', disabled: true }],
    nome: ['', Validators.required],
  });

  onSubmit() {}
}
