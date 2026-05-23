import { UpperCasePipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject, signal } from "@angular/core";
import { FormField, disabled, form, required } from "@angular/forms/signals";
import { MatButton } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatFormField, MatInputModule, MatLabel } from "@angular/material/input";
import { FormErrors } from "../../core/components/form-errors";
import { DepartamentoStore } from "../departamento/shared/departamento.store";
import { EmpresaStore } from "../empresa/shared/empresa.store";
import { DEPARTAMENTO_MODEL_EMPTY, DepartamentoModel } from "./shared/departamento.model";

@Component({
  selector: 'app-departamento-form',
  imports: [
    MatButton,
    MatDialogModule,
    MatFormField,
    MatInputModule,
    MatLabel,
    UpperCasePipe,
    MatCheckboxModule,
    FormField,
    FormErrors
],
  template: `
    <h2 mat-dialog-title class="!font-bold">
      {{ formOpcao() === 'new' ? 'Novo' : ('Editar' | uppercase) }}
      /
      {{ dataForm().value().nome }}
    </h2>

    <mat-dialog-content class="mat-typography">
      <form>
        <div class="mt-2">
          <div class="grid grid-cols-6 gap-2">
            <mat-form-field class="col-span-4" [appearance]="formAparence">
              <mat-label>Id</mat-label>
              <input matInput [formField]="dataForm.id" />
              <mat-icon matPrefix>123</mat-icon>
              <app-form-errors [errors]="dataForm.id().errors()" />
            </mat-form-field>

            <div class="col-span-2">
              <mat-checkbox [formField]="dataForm.ativo">Ativo</mat-checkbox>
              <app-form-errors [errors]="dataForm.ativo().errors()" />
            </div>
          </div>

          <div class="grid grid-cols-6 gap-2">
            <mat-form-field class="col-span-6" [appearance]="formAparence">
              <mat-label>Nome</mat-label>
              <input matInput [formField]="dataForm.nome" />
              <app-form-errors [errors]="dataForm.nome().errors()" />
            </mat-form-field>
          </div>
        </div>
      </form>
      <!-- {{ dataForm().value() | json }} -->
    </mat-dialog-content>
    <div class="border-t">
      <mat-dialog-actions align="center">
        <button matButton="tonal" mat-dialog-close>Cancel</button>
        <button matButton="filled" [disabled]="dataForm().invalid()" (click)="onSubmit()">
          Confirma
        </button>
      </mat-dialog-actions>
    </div>
  `,

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DepartamentoForm {
  dialogRef = inject(MatDialogRef<DepartamentoForm>);
  data = inject<any>(MAT_DIALOG_DATA);
  formAparence: 'fill' | 'outline' = 'fill';
  formOpcao = signal<string>('');
  empresaStore = inject(EmpresaStore);
  departamentoStore = inject(DepartamentoStore);

  private fb = signal<DepartamentoModel>(DEPARTAMENTO_MODEL_EMPTY);

  dataForm = form<DepartamentoModel>(this.fb, (schemaPath) => {
    disabled(schemaPath.id);
    required(schemaPath.nome, { message: 'Requerido' });
    required(schemaPath.ativo, { message: 'Requerido' });
  });
  ngOnInit() {
    const { data } = this.data;
    this.fb.set(data);
    this.dataForm().markAsDirty();
    this.dataForm().markAsTouched();
    this.formOpcao.set(this.data.opcao);
  }

  onSubmit() {
    const ret = {
      ...this.dataForm().value(),
      empresa: this.empresaStore.empresaLogada()?.id as string,
    };
    this.dialogRef.close(ret);
  }
}
