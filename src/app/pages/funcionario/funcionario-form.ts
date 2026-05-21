import { UpperCasePipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, effect, inject, signal } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatIcon } from "@angular/material/icon";
import { MatError, MatFormField, MatInputModule, MatLabel } from "@angular/material/input";
import { MatOption, MatSelect } from "@angular/material/select";
import { MatStepperModule } from "@angular/material/stepper";
import { NgxMaskDirective } from "ngx-mask";
import { DepartamentoModel } from "../departamento/shared/departamento.model";
import { DepartamentoStore } from "../departamento/shared/departamento.store";
import { EmpresaService } from "../empresa/shared/empresa.service";

/**
 * @title Dialog with header, scrollable content and actions
 */
@Component({
  selector: 'app-funcionario-form',
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
    NgxMaskDirective,
    MatIcon,
    UpperCasePipe,
    MatStepperModule,
  ],
  template: `
    <h2 mat-dialog-title class="!font-bold">
      {{ formOpcao() === 'new' ? 'Novo' : ('Editar' | uppercase) }}
      /
      {{ dataForm.value.nome }}
    </h2>

    <mat-dialog-content class="mat-typography">
      <form [formGroup]="dataForm">
        <mat-stepper orientation="vertical">
          <mat-step>
            <ng-template matStepLabel>Dados Pessoais</ng-template>
            <ng-template matStepContent>
              <div class="mt-2">
                <div class="grid grid-cols-6 gap-2">
                  <mat-form-field class="col-span-4" [appearance]="formAparence">
                    <mat-label>Id</mat-label>
                    <input readonly matInput formControlName="id" />
                    <mat-icon matPrefix>badge</mat-icon>
                  </mat-form-field>

                  <div class="col-span-2">
                    <mat-checkbox formControlName="ativo">Ativo</mat-checkbox>
                    @if (dataForm.controls['ativo'].hasError('required')) {
                      <mat-error>ativo is <strong>required</strong></mat-error>
                    }
                  </div>
                </div>

                <div class="grid grid-cols-6 gap-2 relative">
                  <mat-form-field class="col-span-6 md:col-span-3" [appearance]="formAparence">
                    <mat-label>Departamento</mat-label>
                    <mat-select formControlName="departamento" [compareWith]="compareDepartamentos">
                      @for (item of departamentos(); track item.id) {
                        <mat-option [value]="item">{{ item.nome }}</mat-option>
                      }
                    </mat-select>
                    @if (dataForm.controls['departamento'].hasError('required')) {
                      <mat-error><strong>required</strong></mat-error>
                    }
                    <!-- {{ dataForm.value.departamento | json }} -->
                  </mat-form-field>

                  @if (departamentos2() === false) {
                    <div
                      class="absolute h-14 w-51 border-4 border-dotted border-gray-400 bg-clip-border backdrop-blur-sm flex items-center justify-center"
                    >
                      <div class="flex items-center animate-spin">
                        <mat-icon>autorenew</mat-icon>
                      </div>
                    </div>
                  }
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

                <div class="grid grid-cols-6 gap-2">
                  <mat-form-field class="col-span-6 md:col-span-3" [appearance]="formAparence">
                    <mat-label>CPF</mat-label>
                    <input matInput type="text" formControlName="cpf" mask="000.000.000-00" />
                    @if (dataForm.controls['cpf'].hasError('required')) {
                      <mat-error>Cpf is <strong>required</strong></mat-error>
                    }
                  </mat-form-field>
                </div>

                <div class="grid grid-cols-6 gap-2">
                  <mat-form-field class="col-span-6 md:col-span-3" [appearance]="formAparence">
                    <mat-label>Data Nascimento</mat-label>
                    <input matInput type="date" formControlName="dataNascimento" />
                    @if (dataForm.controls['dataNascimento'].hasError('required')) {
                      <mat-error>dataNascimento is <strong>required</strong></mat-error>
                    }
                  </mat-form-field>
                </div>

                <div class="grid grid-cols-6 gap-2">
                  <mat-form-field class="col-span-6" [appearance]="formAparence">
                    <mat-label>Nome Mae</mat-label>
                    <input matInput formControlName="nomeMae" />
                    @if (dataForm.controls['nomeMae'].hasError('required')) {
                      <mat-error>nomeMae is <strong>required</strong></mat-error>
                    }
                  </mat-form-field>
                </div>

                <div class="grid grid-cols-6 gap-2">
                  <mat-form-field class="col-span-6 md:col-span-3" [appearance]="formAparence">
                    <mat-label>Nacionalidade</mat-label>
                    <input matInput formControlName="nacionalidade" />
                    @if (dataForm.controls['nacionalidade'].hasError('required')) {
                      <mat-error>nacionalidade is <strong>required</strong></mat-error>
                    }
                  </mat-form-field>
                </div>

                <div class="grid grid-cols-6 gap-2">
                  <mat-form-field class="col-span-6 md:col-span-3" [appearance]="formAparence">
                    <mat-label>Naturalidade</mat-label>
                    <input matInput formControlName="naturalidade" />
                    @if (dataForm.controls['naturalidade'].hasError('required')) {
                      <mat-error>naturalidade is <strong>required</strong></mat-error>
                    }
                  </mat-form-field>
                </div>

                <div class="grid grid-cols-6 gap-2">
                  <mat-form-field class="col-span-6 md:col-span-3" [appearance]="formAparence">
                    <mat-label>Genero</mat-label>

                    <mat-select formControlName="genero">
                      <mat-option value="M">Masculino</mat-option>
                      <mat-option value="F">Feminino</mat-option>
                    </mat-select>

                    @if (dataForm.controls['genero'].hasError('required')) {
                      <mat-error>genero is <strong>required</strong></mat-error>
                    }
                  </mat-form-field>
                </div>

                <div class="grid grid-cols-6 gap-2">
                  <mat-form-field class="col-span-6 md:col-span-3" [appearance]="formAparence">
                    <mat-label>Raca Cor</mat-label>
                    <mat-select formControlName="racaCor">
                      @for (item of racaCorSelect(); track $index) {
                        <mat-option [value]="item.valor">{{ item.label }}</mat-option>
                      }
                    </mat-select>
                    @if (dataForm.controls['racaCor'].hasError('required')) {
                      <mat-error>racaCor is <strong>required</strong></mat-error>
                    }
                  </mat-form-field>
                </div>

                <div class="grid grid-cols-6 gap-2">
                  <mat-form-field class="col-span-6 md:col-span-3" [appearance]="formAparence">
                    <mat-label>Estado Civil</mat-label>
                    <mat-select formControlName="estadoCivil">
                      @for (item of estadoCivilSelect(); track $index) {
                        <mat-option [value]="item.valor">{{ item.label }}</mat-option>
                      }
                    </mat-select>
                    @if (dataForm.controls['estadoCivil'].hasError('required')) {
                      <mat-error>estadoCivil is <strong>required</strong></mat-error>
                    }
                  </mat-form-field>
                </div>
              </div>
              <button matButton="filled" matStepperNext>Next</button>
            </ng-template>
          </mat-step>

          <mat-step>
            <ng-template matStepLabel>Documentação</ng-template>
            <ng-template matStepContent>
              <div class="mt-2">
                <div class="grid grid-cols-6 gap-2">
                  <mat-form-field class="col-span-6 md:col-span-3" [appearance]="formAparence">
                    <mat-label>Rg</mat-label>
                    <input matInput formControlName="rg" />
                    @if (dataForm.controls['rg'].hasError('required')) {
                      <mat-error>Rg is <strong>required</strong></mat-error>
                    }
                  </mat-form-field>
                </div>
                <div class="grid grid-cols-6 gap-2">
                  <mat-form-field class="col-span-6 md:col-span-3" [appearance]="formAparence">
                    <mat-label>Ctps</mat-label>
                    <input matInput formControlName="ctpsDigital" />
                    @if (dataForm.controls['ctpsDigital'].hasError('required')) {
                      <mat-error>ctpsDigital is <strong>required</strong></mat-error>
                    }
                  </mat-form-field>
                </div>

                <div class="grid grid-cols-6 gap-2">
                  <mat-form-field class="col-span-6 md:col-span-3" [appearance]="formAparence">
                    <mat-label>Pis/Pasep</mat-label>
                    <mat-icon matPrefix>search</mat-icon>
                    <input matInput formControlName="pisPasep" />
                    @if (dataForm.controls['pisPasep'].hasError('required')) {
                      <mat-error>pisPasep is <strong>required</strong></mat-error>
                    }
                  </mat-form-field>
                </div>

                <div class="grid grid-cols-6 gap-2">
                  <mat-form-field class="col-span-6 md:col-span-3" [appearance]="formAparence">
                    <mat-label>Titulo Eleitor</mat-label>
                    <mat-icon matPrefix>search</mat-icon>
                    <input matInput formControlName="tituloEleitor" />
                    @if (dataForm.controls['tituloEleitor'].hasError('required')) {
                      <mat-error>tituloEleitor is <strong>required</strong></mat-error>
                    }
                  </mat-form-field>
                </div>

                <div class="grid grid-cols-6 gap-2">
                  <mat-form-field class="col-span-6 md:col-span-3" [appearance]="formAparence">
                    <mat-label>Reservista</mat-label>
                    <input matInput formControlName="certificadoReservista" />
                    @if (dataForm.controls['certificadoReservista'].hasError('required')) {
                      <mat-error>certificadoReservista is <strong>required</strong></mat-error>
                    }
                  </mat-form-field>
                </div>
              </div>
              <button matButton="tonal" matStepperPrevious>Back</button>
              <button matButton="filled" class="ml-2" matStepperNext>Next</button>
            </ng-template>
          </mat-step>

          <mat-step>
            <ng-template matStepLabel>Endereço</ng-template>
            <ng-template matStepContent>
              <div class="mt-2">
                <div class="grid grid-cols-6 gap-2">
                  <mat-form-field class="col-span-6" [appearance]="formAparence">
                    <mat-label>Endereço</mat-label>
                    <mat-icon matPrefix>home</mat-icon>
                    <input matInput formControlName="endereco" />
                    @if (dataForm.controls['endereco'].hasError('required')) {
                      <mat-error>endereco is <strong>required</strong></mat-error>
                    }
                  </mat-form-field>
                </div>
                <div class="grid grid-cols-6 gap-2">
                  <mat-form-field class="col-span-6" [appearance]="formAparence">
                    <mat-label>Bairro</mat-label>
                    <input matInput formControlName="bairro" />
                    @if (dataForm.controls['bairro'].hasError('required')) {
                      <mat-error>bairrois <strong>required</strong></mat-error>
                    }
                  </mat-form-field>
                </div>

                <div class="grid grid-cols-6 gap-2">
                  <mat-form-field class="col-span-6" [appearance]="formAparence">
                    <mat-label>Cidade</mat-label>
                    <mat-icon matPrefix>location_city</mat-icon>
                    <input matInput formControlName="cidade" />
                    @if (dataForm.controls['cidade'].hasError('required')) {
                      <mat-error>cidade is <strong>required</strong></mat-error>
                    }
                  </mat-form-field>
                </div>

                <div class="grid grid-cols-6 gap-2">
                  <mat-form-field class="col-span-6 md:col-span-3" [appearance]="formAparence">
                    <mat-label>CEP</mat-label>
                    <input matInput formControlName="cep" mask="00000-000" />
                    @if (dataForm.controls['cep'].hasError('required')) {
                      <mat-error>cep is <strong>required</strong></mat-error>
                    }
                  </mat-form-field>
                </div>

                <div class="grid grid-cols-6 gap-2">
                  <mat-form-field class="col-span-6 md:col-span-3" [appearance]="formAparence">
                    <mat-label>Telefone</mat-label>
                    <mat-icon matPrefix>phone</mat-icon>
                    <input matInput formControlName="telefone" mask="(00) 00000-0000" />

                    @if (dataForm.controls['telefone'].hasError('required')) {
                      <mat-error>telefone is <strong>required</strong></mat-error>
                    }
                  </mat-form-field>
                </div>

                <div class="grid grid-cols-6 gap-2">
                  <mat-form-field class="col-span-6 md:col-span-3" [appearance]="formAparence">
                    <mat-label>Celular</mat-label>
                    <mat-icon matPrefix>phone</mat-icon>
                    <input matInput formControlName="celular" mask="(00) 00000-0000" />
                    @if (dataForm.controls['celular'].hasError('required')) {
                      <mat-error>celular is <strong>required</strong></mat-error>
                    }
                  </mat-form-field>
                </div>
                <div class="grid grid-cols-6 gap-2">
                  <mat-form-field class="col-span-6" [appearance]="formAparence">
                    <mat-label>Email</mat-label>
                    <mat-icon matPrefix>email</mat-icon>
                    <input matInput formControlName="email" />
                    @if (dataForm.controls['email'].hasError('required')) {
                      <mat-error>email is <strong>required</strong></mat-error>
                    }
                  </mat-form-field>
                </div>
              </div>
              <button matButton="tonal" matStepperPrevious>Back</button>
              <button matButton="filled" class="ml-2" matStepperNext>Next</button>
            </ng-template>
          </mat-step>

          <mat-step>
            <ng-template matStepLabel>Dados Contratuais e Profissionais</ng-template>
            <ng-template matStepContent>
              <div class="mt-2">
                <div class="grid grid-cols-6 gap-2">
                  <mat-form-field class="col-span-6 md:col-span-3" [appearance]="formAparence">
                    <mat-label>Data Admissão</mat-label>
                    <input matInput type="date" formControlName="dataAdmissao" />
                    @if (dataForm.controls['dataAdmissao'].hasError('required')) {
                      <mat-error>dataAdmissao is <strong>required</strong></mat-error>
                    }
                  </mat-form-field>
                </div>

                <div class="grid grid-cols-6 gap-2">
                  <mat-form-field class="col-span-6 md:col-span-3" [appearance]="formAparence">
                    <mat-label>Cargo/Função Desempenhada</mat-label>
                    <input matInput formControlName="cargoFuncaoDesempenhada" />
                    @if (dataForm.controls['cargoFuncaoDesempenhada'].hasError('required')) {
                      <mat-error>cargoFuncaoDesempenhada is <strong>required</strong></mat-error>
                    }
                  </mat-form-field>
                </div>

                <div class="grid grid-cols-6 gap-2">
                  <mat-form-field class="col-span-6" [appearance]="formAparence">
                    <mat-label>Categoria Trabalhador</mat-label>
                    <mat-select formControlName="categoriaTrabalhador">
                      @for (item of categoriaTrabalhadorSelect(); track $index) {
                        <mat-option [value]="item.valor">{{ item.label }}</mat-option>
                      }
                    </mat-select>
                    @if (dataForm.controls['categoriaTrabalhador'].hasError('required')) {
                      <mat-error>categoriaTrabalhador is <strong>required</strong></mat-error>
                    }
                  </mat-form-field>
                </div>

                <div class="grid grid-cols-6 gap-2">
                  <mat-form-field class="col-span-6 md:col-span-3" [appearance]="formAparence">
                    <mat-label>Tipo Contrato</mat-label>
                    <mat-select formControlName="tipoContrato">
                      @for (item of tipoContratoSelect(); track $index) {
                        <mat-option [value]="item.valor">{{ item.label }}</mat-option>
                      }
                    </mat-select>
                    @if (dataForm.controls['tipoContrato'].hasError('required')) {
                      <mat-error>tipoContrato is <strong>required</strong></mat-error>
                    }
                  </mat-form-field>
                </div>

                <div class="grid grid-cols-6 gap-2">
                  <mat-form-field class="col-span-6 md:col-span-3" [appearance]="formAparence">
                    <mat-label>Jornada de Trabalho</mat-label>
                    <input matInput formControlName="jornadaTrabalho" />
                    @if (dataForm.controls['jornadaTrabalho'].hasError('required')) {
                      <mat-error>jornadaTrabalho is <strong>required</strong></mat-error>
                    }
                  </mat-form-field>
                </div>

                <div class="grid grid-cols-6 gap-2">
                  <mat-form-field class="col-span-6 md:col-span-3" [appearance]="formAparence">
                    <mat-label>Vinculo Sindicato</mat-label>
                    <input matInput formControlName="vinculoSindicato" />
                    @if (dataForm.controls['vinculoSindicato'].hasError('required')) {
                      <mat-error>vinculoSindicato is <strong>required</strong></mat-error>
                    }
                  </mat-form-field>
                </div>

                <div class="grid grid-cols-6 gap-2">
                  <mat-form-field class="col-span-6 md:col-span-3" [appearance]="formAparence">
                    <mat-label>Departamento/Centro de Custo</mat-label>
                    <input matInput formControlName="departamentoCentroCusto" />
                    @if (dataForm.controls['departamentoCentroCusto'].hasError('required')) {
                      <mat-error>departamentoCentroCusto is <strong>required</strong></mat-error>
                    }
                  </mat-form-field>
                </div>
              </div>
              <button matButton="tonal" matStepperPrevious>Back</button>
              <button matButton="filled" class="ml-2" matStepperNext>Next</button>
            </ng-template>
          </mat-step>

          <mat-step>
            <ng-template matStepLabel>Dados de Remuneração e Bancários</ng-template>
            <ng-template matStepContent>
              <div class="mt-2">
                <div class="grid grid-cols-6 gap-2">
                  <mat-form-field class="col-span-6 md:col-span-3" [appearance]="formAparence">
                    <mat-label>Salário Base</mat-label>
                    <mat-icon matPrefix>attach_money</mat-icon>
                    <input matInput type="number" formControlName="salarioBase" />
                    @if (dataForm.controls['salarioBase'].hasError('required')) {
                      <mat-error>salarioBase is <strong>required</strong></mat-error>
                    }
                  </mat-form-field>
                </div>

                <div class="grid grid-cols-6 gap-2">
                  <mat-form-field class="col-span-6 md:col-span-3" [appearance]="formAparence">
                    <mat-label>Tipo Conta</mat-label>
                    <mat-select formControlName="tipoConta">
                      @for (item of tipoContaSelect(); track $index) {
                        <mat-option [value]="item.valor">{{ item.label }}</mat-option>
                      }
                    </mat-select>
                    @if (dataForm.controls['tipoConta'].hasError('required')) {
                      <mat-error>tipoConta is <strong>required</strong></mat-error>
                    }
                  </mat-form-field>
                </div>

                <div class="grid grid-cols-6 gap-2">
                  <mat-form-field class="col-span-6 md:col-span-3" [appearance]="formAparence">
                    <mat-label>Tipo Banco</mat-label>
                    <input matInput formControlName="banco" />
                    @if (dataForm.controls['banco'].hasError('required')) {
                      <mat-error>banco is <strong>required</strong></mat-error>
                    }
                  </mat-form-field>
                </div>

                <div class="grid grid-cols-6 gap-2">
                  <mat-form-field class="col-span-6 md:col-span-3" [appearance]="formAparence">
                    <mat-label>Agência</mat-label>
                    <input matInput formControlName="agencia" />
                    @if (dataForm.controls['agencia'].hasError('required')) {
                      <mat-error>agencia is <strong>required</strong></mat-error>
                    }
                  </mat-form-field>
                </div>

                <div class="grid grid-cols-6 gap-2">
                  <mat-form-field class="col-span-6 md:col-span-3" [appearance]="formAparence">
                    <mat-label>Conta</mat-label>
                    <input matInput formControlName="conta" />
                    @if (dataForm.controls['conta'].hasError('required')) {
                      <mat-error>conta is <strong>required</strong></mat-error>
                    }
                  </mat-form-field>
                </div>
              </div>
              <button matButton="tonal" matStepperPrevious>Back</button>
              <button matButton="filled" class="ml-2" matStepperNext>Next</button>
            </ng-template>
          </mat-step>

          <mat-step>
            <ng-template matStepLabel>Informações de Benefícios e Saúde</ng-template>
            <ng-template matStepContent>
              <div class="mt-2">
                <div class="grid grid-cols-6 gap-2">
                  <mat-form-field class="col-span-6 md:col-span-3" [appearance]="formAparence">
                    <mat-label>Plano de Saude</mat-label>
                    <input matInput formControlName="planoSaude" />
                    @if (dataForm.controls['planoSaude'].hasError('required')) {
                      <mat-error>planoSaude is <strong>required</strong></mat-error>
                    }
                  </mat-form-field>
                </div>

                <div class="grid grid-cols-6 gap-2">
                  <mat-form-field class="col-span-6 md:col-span-3" [appearance]="formAparence">
                    <mat-label>Plano Odontológico</mat-label>
                    <input matInput formControlName="planoOdontologico" />
                    @if (dataForm.controls['planoOdontologico'].hasError('required')) {
                      <mat-error>planoOdontologico is <strong>required</strong></mat-error>
                    }
                  </mat-form-field>
                </div>

                <div class="grid grid-cols-6 gap-2">
                  <mat-form-field class="col-span-6 md:col-span-3" [appearance]="formAparence">
                    <mat-label>Plano de Saude</mat-label>
                    <input matInput formControlName="valeTransporte" />
                    @if (dataForm.controls['valeTransporte'].hasError('required')) {
                      <mat-error>valeTransporte is <strong>required</strong></mat-error>
                    }
                  </mat-form-field>
                </div>
                <div class="grid grid-cols-6 gap-2">
                  <mat-form-field class="col-span-6 md:col-span-3" [appearance]="formAparence">
                    <mat-label>Insalubridade</mat-label>
                    <input matInput formControlName="insalubridade" />
                    @if (dataForm.controls['insalubridade'].hasError('required')) {
                      <mat-error>insalubridade is <strong>required</strong></mat-error>
                    }
                  </mat-form-field>
                </div>

                <div class="grid grid-cols-6 gap-2">
                  <mat-form-field class="col-span-6 md:col-span-3" [appearance]="formAparence">
                    <mat-label>Suporte Top Ponto</mat-label>
                    <input matInput formControlName="suporteTopPonto" />
                    @if (dataForm.controls['suporteTopPonto'].hasError('required')) {
                      <mat-error>suporteTopPonto is <strong>required</strong></mat-error>
                    }
                  </mat-form-field>
                </div>
              </div>
              <button matButton="tonal" matStepperPrevious>Back</button>
              <button matButton="filled" class="ml-2" matStepperNext>Next</button>
            </ng-template>
          </mat-step>

          <mat-step>
            <ng-template matStepLabel>Layout Folha sefip 84</ng-template>
            <ng-template matStepContent>
              <div class="mt-2">
                <div class="grid grid-cols-6 gap-2">
                  <mat-form-field class="col-span-6 md:col-span-3" [appearance]="formAparence">
                    <mat-label>Matricula</mat-label>
                    <input matInput type="text" formControlName="matricula" />
                    @if (dataForm.controls['matricula'].hasError('required')) {
                      <mat-error>Matricula is <strong>required</strong></mat-error>
                    }
                  </mat-form-field>
                </div>

                <div class="grid grid-cols-6 gap-2">
                  <mat-form-field class="col-span-3 md:col-span-3" [appearance]="formAparence">
                    <mat-label>Ctps</mat-label>
                    <input matInput formControlName="ctps" />
                    @if (dataForm.controls['ctps'].hasError('required')) {
                      <mat-error>ctps is <strong>required</strong></mat-error>
                    }
                  </mat-form-field>
                  <mat-form-field class="col-span-3 md:col-span-3" [appearance]="formAparence">
                    <mat-label>Serie Ctps</mat-label>
                    <input matInput formControlName="serieCtps" />
                    @if (dataForm.controls['serieCtps'].hasError('required')) {
                      <mat-error>Serie Ctps is <strong>required</strong></mat-error>
                    }
                  </mat-form-field>
                </div>

                <div class="grid grid-cols-6 gap-2">
                  <mat-form-field class="col-span-6 md:col-span-3" [appearance]="formAparence">
                    <mat-label>Data Opcao</mat-label>
                    <input matInput type="text" formControlName="dataOpcao" mask="00/00/0000" />
                    @if (dataForm.controls['dataOpcao'].hasError('required')) {
                      <mat-error>Data Opcao is <strong>required</strong></mat-error>
                    }
                  </mat-form-field>
                </div>

                <div class="grid grid-cols-6 gap-2">
                  <mat-form-field class="col-span-6 md:col-span-3" [appearance]="formAparence">
                    <mat-label>CBO</mat-label>
                    <input matInput formControlName="cbo" type="text" mask="0-0000" />
                    @if (dataForm.controls['cbo'].hasError('required')) {
                      <mat-error>CBO is <strong>required</strong></mat-error>
                    }
                  </mat-form-field>
                </div>

                <div class="grid grid-cols-6 gap-2">
                  <mat-form-field class="col-span-6 md:col-span-3" [appearance]="formAparence">
                    <mat-label>Classe de contribuicao</mat-label>
                    <input matInput formControlName="classeDeContribuicao" />
                    @if (dataForm.controls['classeDeContribuicao'].hasError('required')) {
                      <mat-error>classeDeContribuicao is <strong>required</strong></mat-error>
                    }
                  </mat-form-field>
                </div>

                <div class="grid grid-cols-6 gap-2">
                  <mat-form-field class="col-span-6" [appearance]="formAparence">
                    <mat-label>Ocorrencia</mat-label>
                    <mat-select formControlName="ocorrencia">
                      @for (item of ocorrenciaSelect(); track $index) {
                        <mat-option [value]="item.valor">{{ item.label }}</mat-option>
                      }
                    </mat-select>
                    @if (dataForm.controls['ocorrencia'].hasError('required')) {
                      <mat-error>Ocorrencia is <strong>required</strong></mat-error>
                    }
                  </mat-form-field>
                </div>
              </div>
              <button matButton="tonal" matStepperPrevious>Back</button>
            </ng-template>
          </mat-step>
        </mat-stepper>
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
export class FuncionarioForm {
  dialogRef = inject(MatDialogRef<FuncionarioForm>);
  data = inject<any>(MAT_DIALOG_DATA);
  formAparence: 'fill' | 'outline' = 'fill';
  formOpcao = signal<string>('');
  empresaService = inject(EmpresaService);
  departamentoStore = inject(DepartamentoStore);

  departamentos = signal<DepartamentoModel[]>([]);
  departamentos2 = signal<boolean>(false);

  compareDepartamentos(o1: any, o2: any): boolean {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

  constructor() {
    effect(() => {
      this.departamentos.set(this.departamentoStore.list());
    });
    setTimeout(() => {
      this.departamentos2.set(true);
    }, 1000);
  }

  ngOnInit() {
    const { data } = this.data;
    this.dataForm.patchValue(data);
    this.dataForm.markAllAsTouched();
    this.dataForm.markAsDirty();
    this.formOpcao.set(this.data.opcao);
    this.departamentos.set(this.departamentoStore.list());
  }

  private fb = inject(FormBuilder);

  dataForm = this.fb.group({
    id: [{ value: '', disabled: true }],
    nome: ['', Validators.required],
    departamento: [{} as DepartamentoModel, Validators.required],
    cpf: [''],
    dataNascimento: ['', Validators.required],
    nomeMae: [''],
    nacionalidade: ['', Validators.required],
    naturalidade: ['', Validators.required],
    genero: [''],
    racaCor: ['', Validators.required],
    estadoCivil: ['', Validators.required],
    ativo: [true],
    rg: [''],
    ctpsDigital: [''],
    pisPasep: [''],
    tituloEleitor: [''],
    certificadoReservista: [''],
    endereco: [''],
    bairro: [''],
    cidade: [''],
    cep: [''],
    telefone: [''],
    celular: [''],
    email: [''],
    dataAdmissao: ['', Validators.required],
    cargoFuncaoDesempenhada: [''],
    categoriaTrabalhador: [''],
    tipoContrato: [''],
    jornadaTrabalho: [''],
    vinculoSindicato: [''],
    departamentoCentroCusto: [''],
    salarioBase: ['', Validators.required],
    tipoConta: [''],
    banco: [''],
    agencia: [''],
    conta: [''],
    planoSaude: [''],
    planoOdontologico: [''],
    valeTransporte: [''],
    insalubridade: [''],
    suporteTopPonto: [''],

    matricula: [''],
    ctps: [''],
    serieCtps: [''],
    dataOpcao: [''],
    cbo: [''],
    classeDeContribuicao: [''],
    ocorrencia: [''],
  });

  onSubmit() {
    const ret = {
      ...this.dataForm.value,
      empresa: this.empresaService.empresaLogada()?.id as string,
    };
    this.dialogRef.close(ret);
  }

  racaCorSelect = signal([
    { label: 'Outro', valor: 'outro' },
    { label: 'Branca', valor: 'branca' },
    { label: 'Preta', valor: 'preta' },
    { label: 'Parda', valor: 'parda' },
    { label: 'Amarela', valor: 'amarela' },
    { label: 'Indigena', valor: 'indigena' },
  ]);
  estadoCivilSelect = signal([
    { label: 'Outro', valor: 'outro' },
    { label: 'Solteiro', valor: 'solteiro' },
    { label: 'Casado', valor: 'casado' },
    { label: 'Divorciado', valor: 'divorciado' },
    { label: 'Viuvo', valor: 'viuvo' },
    { label: 'Uniao Estavel', valor: 'uniao_estavel' },
  ]);
  categoriaTrabalhadorSelect = signal([
    { valor: '01', label: '01 - Empregado' },
    { valor: '02', label: '02 - Trabalhador avulso' },
    { valor: '03', label: '03 - Trabalhador nao vinculado ao RGPS, mas com direito ao FGTS' },
    {
      valor: '04',
      label:
        '04 - Empregado sob contrato de trabalho por prazo determinado - Lei n° 9.601/98, com as alterações da Medida Provisória n° 2.164-41, de 24/08/2001',
    },
    {
      valor: '05',
      label:
        '05 - Contribuinte individual - Diretor nao empregado com FGTS – Lei nº 8.036/90, art. 16',
    },
    { valor: '06', label: '06 - Empregado Doméstico' },
    { valor: '07', label: '07 - Menor aprendiz - Lei n°10.097/2000' },
    {
      valor: '11',
      label: '11 - Contribuinte Individual - Diretor nao empregado e demais empresários sem FGTS',
    },
    { valor: '12', label: '12 - Demais Agentes Públicos' },
    {
      valor: '13',
      label:
        '13 - Contribuinte individual – Trabalhador autônomo ou a este equiparado, inclusive o operador de máquina, com contribuição sobre remuneração; trabalhador associado àcooperativa de produção.',
    },
    {
      valor: '14',
      label:
        '14 Contribuinte individual – Trabalhador autônomo ou a este equiparado, inclusive o operador de máquina, com contribuição sobre salário-base.',
    },
    {
      valor: '15',
      label:
        '15 Contribuinte individual – Transportador autônomo, com contribuição sobre remuneração.',
    },
    {
      valor: '16',
      label:
        '16 Contribuinte individual – Transportador autônomo, com contribuição sobre salário-base.',
    },
    {
      valor: '17',
      label:
        '17 Contribuinte individual – Cooperado que presta serviços a empresas contratantes da cooperativa de trabalho.',
    },
    {
      valor: '18',
      label:
        '18 Contribuinte Individual – Transportador cooperado que presta serviços a empresas contratantes da cooperativa de trabalho.',
    },
    { valor: '19', label: '19 Agente Político.' },
    {
      valor: '20',
      label:
        '20 Servidor Público ocupante, exclusivamente, de cargo em comissão e, Servidor Público ocupante de cargo temporário.',
    },
    {
      valor: '21',
      label:
        '21 Servidor Público titular de cargo efetivo, magistrado, membro do Ministério Público e do Tribunal e Conselho de Contas.',
    },
    {
      valor: '22',
      label:
        '22 Contribuinte individual – contratado por outro contribuinte individual equiparado a empresa ou por produtor rural pessoa física ou por missão diplomática e repartição consular de carreira estrangeiras.',
    },
    {
      valor: '23',
      label:
        '23 Contribuinte individual – transportador autônomo contratado por outro contribuinte individual equiparado à empresa ou por produtor rural pessoa física ou por missão diplomática e repartição consular de carreira estrangeiras.',
    },
    {
      valor: '24',
      label:
        '24 Contribuinte individual – Cooperado que presta serviços a entidade beneficente de assistência social isenta da cota patronal ou a pessoa física, por intermédio da cooperativa de trabalho.',
    },
    {
      valor: '25',
      label:
        '25 Contribuinte individual – Transportador cooperado que presta serviços a entidade beneficente de assistência social isenta da cota patronal ou a pessoa física, por intermédio da cooperativa de trabalho.',
    },
    {
      valor: '26',
      label:
        '26 Dirigente sindical, em relação ao adic. pago pelo sindicato; magistrado classista temporário da Justiça do Trabalho; magistrado dos Tribunais Eleitorais, quando, nas 3 situações, for mantida a qualidade de seg empregado (sem FGTS)',
    },
  ]);
  tipoContratoSelect = signal([
    { label: 'Outro', valor: 'outro' },
    { label: 'Indeterminado', valor: 'indeterminado' },
    { label: 'Intermitente', valor: 'intermitente' },
    { label: 'Temporario', valor: 'temporario' },
    { label: 'Aprendiz', valor: 'aprendiz' },
    { label: 'Horista', valor: 'horista' },
    { label: 'Mensalista', valor: 'mensalista' },
    { label: 'Contrato', valor: 'contrato' },
    { label: 'CLT', valor: 'clt' },
    { label: 'PJ', valor: 'pj' },
    { label: 'Estagiario', valor: 'estagiario' },
  ]);
  tipoContaSelect = signal([
    { label: 'Outro', valor: 'outro' },
    { label: 'Corrente', valor: 'corrente' },
    { label: 'Poupanca', valor: 'poupanca' },
    { label: 'Salario', valor: 'salario' },
  ]);

  ocorrenciaSelect = signal([
    { valor: '01', label: '01 - Não exposição a agente nocivo' },
    {
      valor: '02',
      label: '02 - Exposição a agente nocivo (aposentadoria especial aos 15 anos de trabalho)',
    },
    {
      valor: '03',
      label: '03 - Exposição a agente nocivo (aposentadoria especial 20 anos de trabalho)',
    },
    {
      valor: '04',
      label: '04 - Exposição a agente nocivo (aposentadoria especial 25 anos de trabalho)',
    },
    {
      valor: '05',
      label:
        '05 - Mais de um vínculo empregatício (ou fonte pagadora) - Não exposição a agente nocivo',
    },
    {
      valor: '06',
      label:
        '06 - Mais de um vínculo empregatício (ou fonte pagadora) - Exposição a agente nocivo (aposentadoria especial aos 15 anos de trabalho)',
    },
    {
      valor: '07',
      label:
        '07 - Mais de um vínculo empregatício (ou fonte pagadora) - Exposição a agente nocivo (aposentadoria especial aos 20 anos de trabalho)',
    },
    {
      valor: '08',
      label:
        '08 - Mais de um vínculo empregatício (ou fonte pagadora) - Exposição a agente nocivo (aposentadoria especial aos 25 anos de trabalho)',
    },
  ]);
}
