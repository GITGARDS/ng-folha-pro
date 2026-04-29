import { UpperCasePipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject, signal } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButton } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatError, MatFormField, MatInputModule, MatLabel } from "@angular/material/input";
import { NgxMaskDirective } from "ngx-mask";

/**
 * @title Dialog with header, scrollable content and actions
 */
@Component({
  selector: 'app-empresa-form',
  imports: [
    MatButton,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormField,
    MatInputModule,
    MatError,
    MatLabel,
    NgxMaskDirective,
    UpperCasePipe,
  ],
  template: `
    <h2 mat-dialog-title class="!font-bold">
      {{ formOpcao() === 'new' ? 'Novo' : ('Editar' | uppercase) }}
      /
      {{ dataForm.value.nomeEmpresaRazaoSocial }}
    </h2>

    <mat-dialog-content class="mat-typography">
      <form [formGroup]="dataForm">
        <div class="mt-2">
          <div class="grid grid-cols-6 gap-2">
            <mat-form-field class="col-span-4" [appearance]="formAparence">
              <mat-label>Id</mat-label>
              <input readonly matInput formControlName="id" />
            </mat-form-field>
          </div>

          <div class="grid grid-cols-6 gap-2">
            <mat-form-field class="col-span-2" [appearance]="formAparence">
              <mat-label>Tipo Inscricao</mat-label>
              <input matInput formControlName="tipoInscricao" />
              @if (dataForm.controls['tipoInscricao'].hasError('required')) {
                <mat-error><strong>Campo requerido</strong></mat-error>
              }
            </mat-form-field>
            <mat-form-field class="col-span-4" [appearance]="formAparence">
              <mat-label>Inscricao</mat-label>
              <input matInput formControlName="inscricao" />
              @if (dataForm.controls['inscricao'].hasError('required')) {
                <mat-error><strong>Campo requerido</strong></mat-error>
              }
            </mat-form-field>
          </div>

          <div class="grid grid-cols-6 gap-2">
            <mat-form-field class="col-span-3" [appearance]="formAparence">
              <mat-label>Inscricao Municipal</mat-label>
              <input matInput formControlName="inscricaoMunicipal" />
              @if (dataForm.controls['inscricaoMunicipal'].hasError('required')) {
                <mat-error><strong>Campo requerido</strong></mat-error>
              }
            </mat-form-field>
            <mat-form-field class="col-span-3" [appearance]="formAparence">
              <mat-label>Inscricao Estadual</mat-label>
              <input matInput formControlName="inscricaoEstadual" />
              @if (dataForm.controls['inscricaoEstadual'].hasError('required')) {
                <mat-error><strong>Campo requerido</strong></mat-error>
              }
            </mat-form-field>
          </div>

          <div class="grid grid-cols-6 gap-2">
            <mat-form-field class="col-span-6" [appearance]="formAparence">
              <mat-label>Nome da Empresa/Razao Social</mat-label>
              <input matInput formControlName="nomeEmpresaRazaoSocial" />
              @if (dataForm.controls['nomeEmpresaRazaoSocial'].hasError('required')) {
                <mat-error><strong>Campo requerido</strong></mat-error>
              }
            </mat-form-field>
          </div>

          <div class="grid grid-cols-6 gap-2">
            <mat-form-field class="col-span-6" [appearance]="formAparence">
              <mat-label>Nome Fantasia</mat-label>
              <input matInput formControlName="nomeFantasia" />
              @if (dataForm.controls['nomeFantasia'].hasError('required')) {
                <mat-error><strong>Campo requerido</strong></mat-error>
              }
            </mat-form-field>
          </div>

          <div class="grid grid-cols-6 gap-2">
            <mat-form-field class="col-span-2" [appearance]="formAparence">
              <mat-label>Data Abertura</mat-label>
              <input matInput type="text" formControlName="dataAbertura" mask="00/00/0000" />
              @if (dataForm.controls['dataAbertura'].hasError('required')) {
                <mat-error><strong>Campo requerido</strong></mat-error>
              }
            </mat-form-field>
            <mat-form-field class="col-span-4" [appearance]="formAparence">
              <mat-label>Email</mat-label>
              <input matInput type="email" formControlName="email" />
              @if (dataForm.controls['email'].hasError('email')) {
                <mat-error><strong>formato incorreto para o campo email</strong></mat-error>
              }
              @if (dataForm.controls['email'].hasError('required')) {
                <mat-error><strong>Campo requerido</strong></mat-error>
              }
            </mat-form-field>
          </div>

          <div class="grid grid-cols-6 gap-2">
            <mat-form-field class="col-span-6" [appearance]="formAparence">
              <mat-label>Logradouro</mat-label>
              <input matInput formControlName="logradouro" />
              @if (dataForm.controls['logradouro'].hasError('required')) {
                <mat-error><strong>Campo requerido</strong></mat-error>
              }
            </mat-form-field>
          </div>

          <div class="grid grid-cols-6 gap-2">
            <mat-form-field class="col-span-4" [appearance]="formAparence">
              <mat-label>Bairro</mat-label>
              <input matInput formControlName="bairro" />
              @if (dataForm.controls['bairro'].hasError('required')) {
                <mat-error><strong>Campo requerido</strong></mat-error>
              }
            </mat-form-field>
            <mat-form-field class="col-span-2" [appearance]="formAparence">
              <mat-label>CEP</mat-label>
              <input matInput type="text" formControlName="cep" mask="00000-000" />
              @if (dataForm.controls['cep'].hasError('required')) {
                <mat-error><strong>Campo requerido</strong></mat-error>
              }
            </mat-form-field>
          </div>

          <div class="grid grid-cols-6 gap-2">
            <mat-form-field class="col-span-4" [appearance]="formAparence">
              <mat-label>Cidade</mat-label>
              <input matInput formControlName="cidade" />
              @if (dataForm.controls['cidade'].hasError('required')) {
                <mat-error><strong>Campo requerido</strong></mat-error>
              }
            </mat-form-field>
            <mat-form-field class="col-span-2" [appearance]="formAparence">
              <mat-label>UF</mat-label>
              <input matInput formControlName="uf" />
              @if (dataForm.controls['uf'].hasError('required')) {
                <mat-error><strong>Campo requerido</strong></mat-error>
              }
            </mat-form-field>
          </div>

          <div class="grid grid-cols-6 gap-2">
            <mat-form-field class="col-span-3" [appearance]="formAparence">
              <mat-label>Telefone</mat-label>
              <input matInput type="text" formControlName="telefone" mask="(00) 00000-0000" />
              @if (dataForm.controls['telefone'].hasError('required')) {
                <mat-error><strong>Campo requerido</strong></mat-error>
              }
            </mat-form-field>
            <mat-form-field class="col-span-3" [appearance]="formAparence">
              <mat-label>Celular</mat-label>
              <input matInput type="text" formControlName="celular" mask="(00) 00000-0000" />
              @if (dataForm.controls['celular'].hasError('required')) {
                <mat-error><strong>Campo requerido</strong></mat-error>
              }
            </mat-form-field>
          </div>

          <div class="grid grid-cols-6 gap-2">
            <mat-form-field class="col-span-2" [appearance]="formAparence">
              <mat-label>cnae</mat-label>
              <input matInput formControlName="cnae" />
              @if (dataForm.controls['cnae'].hasError('required')) {
                <mat-error><strong>Campo requerido</strong></mat-error>
              }
            </mat-form-field>
            <mat-form-field class="col-span-2" [appearance]="formAparence">
              <mat-label>aliquotaRat</mat-label>
              <input matInput formControlName="aliquotaRat" />
              @if (dataForm.controls['aliquotaRat'].hasError('required')) {
                <mat-error><strong>Campo requerido</strong></mat-error>
              }
            </mat-form-field>
            <mat-form-field class="col-span-2" [appearance]="formAparence">
              <mat-label>codigoDeCentralizacao</mat-label>
              <input matInput formControlName="codigoDeCentralizacao" />
              @if (dataForm.controls['codigoDeCentralizacao'].hasError('required')) {
                <mat-error><strong>Campo requerido</strong></mat-error>
              }
            </mat-form-field>
          </div>

          <div class="grid grid-cols-6 gap-2">
            <mat-form-field class="col-span-3" [appearance]="formAparence">
              <mat-label>simples</mat-label>
              <input matInput formControlName="simples" />
              @if (dataForm.controls['simples'].hasError('required')) {
                <mat-error><strong>Campo requerido</strong></mat-error>
              }
            </mat-form-field>
            <mat-form-field class="col-span-3" [appearance]="formAparence">
              <mat-label>fpas</mat-label>
              <input matInput formControlName="fpas" />
              @if (dataForm.controls['fpas'].hasError('required')) {
                <mat-error><strong>Campo requerido</strong></mat-error>
              }
            </mat-form-field>
          </div>

          <div class="grid grid-cols-6 gap-2">
            <mat-form-field class="col-span-3" [appearance]="formAparence">
              <mat-label>codigoDeOutrasEntidades</mat-label>
              <input matInput formControlName="codigoDeOutrasEntidades" />
              @if (dataForm.controls['codigoDeOutrasEntidades'].hasError('required')) {
                <mat-error><strong>Campo requerido</strong></mat-error>
              }
            </mat-form-field>
            <mat-form-field class="col-span-3" [appearance]="formAparence">
              <mat-label>codigoDePagamentoGps</mat-label>
              <input matInput formControlName="codigoDePagamentoGps" />
              @if (dataForm.controls['codigoDePagamentoGps'].hasError('required')) {
                <mat-error><strong>Campo requerido</strong></mat-error>
              }
            </mat-form-field>
          </div>
        </div>
      </form>
    </mat-dialog-content>
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
export class EmpresaForm {
  dialogRef = inject(MatDialogRef<EmpresaForm>);
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
    tipoInscricao: ['J', Validators.required],
    inscricao: ['', Validators.required],
    inscricaoMunicipal: [''],
    inscricaoEstadual: [''],
    nomeEmpresaRazaoSocial: ['', Validators.required],
    nomeFantasia: [''],
    dataAbertura: ['', Validators.required],
    email: ['', { validators: [Validators.required, Validators.email] }],
    logradouro: [''],
    bairro: [''],
    cep: [''],
    cidade: [''],
    uf: [''],
    telefone: [''],
    celular: [''],
    cnae: [''],
    aliquotaRat: [''],
    codigoDeCentralizacao: [''],
    simples: [''],
    fpas: [''],
    codigoDeOutrasEntidades: [''],
    codigoDePagamentoGps: [''],
  });

  onSubmit() {
    this.dialogRef.close(this.dataForm.value);
  }
}
