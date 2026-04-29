import { UpperCasePipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject, signal } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatIcon } from "@angular/material/icon";
import { MatError, MatFormField, MatInputModule, MatLabel } from "@angular/material/input";
import { MatRadioModule } from "@angular/material/radio";
import { MatOption, MatSelect } from "@angular/material/select";

/**
 * @title Dialog with header, scrollable content and actions
 */
@Component({
  selector: 'app-prodes-form',
  imports: [
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormField,
    MatInputModule,
    MatError,
    MatLabel,
    MatCheckboxModule,
    MatSelect,
    MatOption,
    MatIcon,
    UpperCasePipe,
    MatRadioModule,
  ],
  template: `
    <h2 mat-dialog-title class="!font-bold">
      {{ formOpcao() === 'new' ? 'Novo' : ('Editar' | uppercase) }}
      /
      {{ dataForm.value.descricao }}
    </h2>

    <mat-dialog-content class="mat-typography">
      <form [formGroup]="dataForm">
        <div class="mt-2">
          <div class="grid grid-cols-6 gap-2">
            <mat-form-field class="col-span-4" [appearance]="formAparence">
              <mat-label>Id</mat-label>
              <input matInput formControlName="id" />
            </mat-form-field>
          </div>

          <div class="grid grid-cols-6 gap-2">
            <mat-form-field class="col-span-4" [appearance]="formAparence">
              <mat-label>Codigo</mat-label>
              <input matInput [readonly]="formOpcao() === 'update'" formControlName="codigo" />
              <mat-icon matPrefix>123</mat-icon>
              @if (dataForm.controls['codigo'].hasError('required')) {
                <mat-error>codigo is <strong>required</strong></mat-error>
              }
            </mat-form-field>

            <div class="col-span-2">
              <mat-checkbox formControlName="ativo">Ativo</mat-checkbox>
              @if (dataForm.controls['ativo'].hasError('required')) {
                <mat-error>ativo is <strong>required</strong></mat-error>
              }
            </div>
          </div>

          <div class="grid grid-cols-6 gap-2">
            <mat-form-field class="col-span-6" [appearance]="formAparence">
              <mat-label>Descricao</mat-label>
              <input matInput formControlName="descricao" />
              <mat-icon matPrefix>person</mat-icon>
              @if (dataForm.controls['descricao'].hasError('required')) {
                <mat-error>Descricao is <strong>required</strong></mat-error>
              }
            </mat-form-field>
          </div>

          <div class="grid grid-cols-6 gap-2">
            <mat-radio-group
              aria-label="Select uma opcao"
              class="col-span-6 md:col-span-3"
              formControlName="tipo"
            >
              <mat-radio-button checked value="provento">Provento</mat-radio-button>
              <mat-radio-button value="desconto">Desconto</mat-radio-button>
            </mat-radio-group>
          </div>

          <div class="grid grid-cols-6 gap-2">
            <mat-form-field class="col-span-6 md:col-span-3" [appearance]="formAparence">
              <mat-label>Incidencias</mat-label>
              <mat-select formControlName="incidencias" multiple>
                <mat-option value="INSS">INSS</mat-option>
                <mat-option value="FGTS">FGTS</mat-option>
                <mat-option value="IRRF">IRRF</mat-option>
              </mat-select>

              @if (dataForm.controls['incidencias'].hasError('required')) {
                <mat-error>incidencias is <strong>required</strong></mat-error>
              }
            </mat-form-field>
          </div>

          <div class="grid grid-cols-6 gap-2">
            <div class="col-span-2">
              <mat-checkbox formControlName="automatico">Calculo Automatico</mat-checkbox>
              @if (dataForm.controls['automatico'].hasError('required')) {
                <mat-error>automatico is <strong>required</strong></mat-error>
              }
            </div>
          </div>
        </div>
      </form>
    </mat-dialog-content>
    <!-- 'text' | 'filled' | 'elevated' | 'outlined' | 'tonal' -->
    <div class="border-t">
      <mat-dialog-actions align="center">
        <button matButton="tonal" mat-dialog-close>Cancel</button>
        <button matButton="filled" [disabled]="dataForm.invalid" (click)="onSubmit()">
          Confirma
        </button>
      </mat-dialog-actions>
    </div>
  `,

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProdesForm {
  dialogRef = inject(MatDialogRef<ProdesForm>);
  data = inject<any>(MAT_DIALOG_DATA);
  formAparence: 'fill' | 'outline' = 'fill';
  formOpcao = signal<string>('');

  ngOnInit() {
    const { data } = this.data;
    this.dataForm.patchValue(data);
    this.dataForm.markAllAsTouched();
    this.dataForm.markAsDirty();
    this.formOpcao.set(this.data.opcao);
  }

  private fb = inject(FormBuilder);

  dataForm = this.fb.group({
    id: [{ value: '', disabled: true }],
    codigo: ['', Validators.required],
    descricao: ['', Validators.required],
    tipo: ['provento'],
    incidencias: [[], Validators.required],
    automatico: [false],
    ativo: [true],
  });

  onSubmit() {
    this.dialogRef.close(this.dataForm.value);
  }
}
