import { UpperCasePipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject, signal } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatDivider } from "@angular/material/divider";
import { MatIcon } from "@angular/material/icon";
import { MatError, MatFormField, MatInputModule, MatLabel } from "@angular/material/input";
import { MatStepperModule } from "@angular/material/stepper";
import { MatTabsModule } from "@angular/material/tabs";

/**
 * @title Dialog with header, scrollable content and actions
 */
@Component({
  selector: 'app-tabela-form',
  imports: [
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormField,
    MatInputModule,
    MatError,
    MatLabel,
    MatCheckboxModule,
    MatIcon,
    UpperCasePipe,
    MatStepperModule,
    MatTabsModule,
    MatCardModule,
    MatDivider,
  ],
  template: `
    <h2 mat-dialog-title class="!font-bold">
      {{ formOpcao() === 'new' ? 'Novo' : ('Editar' | uppercase) }}
      /
      {{ dataForm.value.nome }}
    </h2>
    @let mt = 'mt-10';

    <mat-dialog-content class="mat-typography">
      <form [formGroup]="dataForm">
        <div class="grid grid-cols-6 gap-2">
          <mat-form-field class="col-span-2" [appearance]="formAparence">
            <mat-label>Id</mat-label>
            <input readonly matInput formControlName="id" />
            @if (dataForm.controls['id'].hasError('required')) {
              <mat-error><strong>required</strong></mat-error>
            }
          </mat-form-field>
          <mat-form-field class="col-span-2" [appearance]="formAparence">
            <mat-label>Referencia</mat-label>
            <input type="number" matInput formControlName="referencia" />
            @if (dataForm.controls['referencia'].hasError('required')) {
              <mat-error><strong>required</strong></mat-error>
            }
          </mat-form-field>
        </div>
        <div class="grid grid-cols-6 gap-2">
          <mat-form-field class="col-span-6" [appearance]="formAparence">
            <mat-label>Nome</mat-label>
            <input matInput formControlName="nome" />
            <mat-icon matPrefix>person</mat-icon>
            @if (dataForm.controls['nome'].hasError('required')) {
              <mat-error>Nome is <strong>required</strong></mat-error>
            }
          </mat-form-field>
        </div>
        <div class="mt-5">
          <mat-divider/>
        </div>

        <div class="mt-5" appearance="filled">
          <h2 class="font-medium text-2xl text-center">Tabelas</h2>
          <mat-tab-group headerPosition="above" dynamicHeight>
            <mat-tab label="FTGS">
              <div [class]='mt'>
                <div formArrayName="fgts">
                  <div class="grid grid-cols-3 gap-2">
                    <mat-form-field class="col-span-1" [appearance]="formAparence">
                      <mat-label>CLT GERA</mat-label>
                      <input matInput formControlName="clt_geral" />
                    </mat-form-field>
                    <mat-form-field class="col-span-1" [appearance]="formAparence">
                      <mat-label>JOVEM APRENDIZ</mat-label>
                      <input matInput formControlName="jovem_aperndiz" />
                    </mat-form-field>
                    <mat-form-field class="col-span-1" [appearance]="formAparence">
                      <mat-label>DOMESTICO</mat-label>
                      <input matInput formControlName="domestico" />
                    </mat-form-field>
                  </div>
                </div>
              </div>
            </mat-tab>
            <mat-tab label="INSS">
              <div [class]='mt'>
                <table formArrayName="inss">
                  <tr class="grid grid-cols-2 gap-2">
                    <th class="col-span-1">Salário de Contribuição (R$)</th>
                    <th class="col-span-1">Alíquota Progressiva</th>
                  </tr>
                  @for (item of dataForm.controls['inss'].value; track $index) {
                    <tr [formGroupName]="$index" class="grid grid-cols-2 gap-2">
                      <td class="col-span-1">
                        <mat-form-field>
                          <mat-label>Salario</mat-label>
                          <input matInput type="number" formControlName="salarioContribuicao" />
                        </mat-form-field>
                      </td>
                      <td class="col-span-1">
                        <mat-form-field>
                          <mat-label>Aliquota</mat-label>
                          <input matInput type="number" formControlName="aliquotaProgressiva" />
                        </mat-form-field>
                      </td>
                    </tr>
                  }
                </table>
              </div>
            </mat-tab>
            <mat-tab label="IRPF">
              <div [class]='mt'>
                <table formArrayName="irrf">
                  <tr class="grid grid-cols-3 gap-2">
                    <th class="col-span-1">Salário de Contribuição (R$)</th>
                    <th class="col-span-1">Alíquota Progressiva</th>
                    <th class="col-span-1">Deducao</th>
                  </tr>
                  @for (item of dataForm.controls['irrf'].value; track $index) {
                    <tr [formGroupName]="$index" class="grid grid-cols-3 gap-2">
                      <td class="col-span-1">
                        <mat-form-field>
                          <mat-label>Salario</mat-label>
                          <input matInput type="number" formControlName="salarioContribuicao" />
                        </mat-form-field>
                      </td>
                      <td class="col-span-1">
                        <mat-form-field>
                          <mat-label>Aliquota</mat-label>
                          <input matInput type="number" formControlName="aliquotaProgressiva" />
                        </mat-form-field>
                      </td>
                      <td class="col-span-1">
                        <mat-form-field>
                          <mat-label>Deducao</mat-label>
                          <input matInput type="number" formControlName="deducao" />
                        </mat-form-field>
                      </td>
                    </tr>
                  }
                </table>
              </div>
            </mat-tab>
          </mat-tab-group>
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
export class TabelaForm {
  dialogRef = inject(MatDialogRef<TabelaForm>);
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
    referencia: [0],
    nome: ['', Validators.required],
    fgts: this.fb.group({
      clt_geral: [0],
      jovem_aperndiz: [0],
      domestico: [0],
    }),
    inss: this.fb.array([
      this.fb.group({
        salarioContribuicao: [0],
        aliquotaProgressiva: [0],
        deducao: [0],
      }),
      this.fb.group({
        salarioContribuicao: [0],
        aliquotaProgressiva: [0],
        deducao: [0],
      }),
      this.fb.group({
        salarioContribuicao: [0],
        aliquotaProgressiva: [0],
        deducao: [0],
      }),
      this.fb.group({
        salarioContribuicao: [0],
        aliquotaProgressiva: [0],
        deducao: [0],
      }),
      this.fb.group({
        salarioContribuicao: [0],
        aliquotaProgressiva: [0],
        deducao: [0],
      }),
    ]),
    irrf: this.fb.array([
      this.fb.group({
        salarioContribuicao: [0],
        aliquotaProgressiva: [0],
        deducao: [0],
      }),
      this.fb.group({
        salarioContribuicao: [0],
        aliquotaProgressiva: [0],
        deducao: [0],
      }),
      this.fb.group({
        salarioContribuicao: [0],
        aliquotaProgressiva: [0],
        deducao: [0],
      }),
      this.fb.group({
        salarioContribuicao: [0],
        aliquotaProgressiva: [0],
        deducao: [0],
      }),
      this.fb.group({
        salarioContribuicao: [0],
        aliquotaProgressiva: [0],
        deducao: [0],
      }),
    ]),
  });

  onSubmit() {
    this.dialogRef.close(this.dataForm.value);
  }
}
