import { UpperCasePipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, effect, inject, signal } from "@angular/core";
import { FormField, disabled, email, form, required } from "@angular/forms/signals";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatIcon } from "@angular/material/icon";
import { MatFormField, MatInputModule, MatLabel } from "@angular/material/input";
import { MatOption, MatSelect } from "@angular/material/select";
import { MatStepperModule } from "@angular/material/stepper";
import { MatTabsModule } from "@angular/material/tabs";
import { NgxMaskDirective } from "ngx-mask";
import { FormErrors } from "../../core/components/form-errors";
import { DepartamentoModel } from "../departamento/shared/departamento.model";
import { DepartamentoStore } from "../departamento/shared/departamento.store";
import { EmpresaStore } from "../empresa/shared/empresa.store";
import { FUNCIONARIO_MODEL_EMPTY, FuncionarioModel } from "./shared/funcionario.model";

/**
 * @title Dialog with header, scrollable content and actions
 */
@Component({
  selector: 'app-funcionario-form',
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatFormField,
    MatInputModule,
    MatLabel,
    MatCheckboxModule,
    MatSelect,
    MatOption,
    NgxMaskDirective,
    MatIcon,
    UpperCasePipe,
    MatStepperModule,
    MatTabsModule,
    FormField,
    FormErrors,    
  ],
  template: `
    <h2 mat-dialog-title class="!font-bold">
      {{ formOpcao() === 'new' ? 'Novo' : ('Editar' | uppercase) }}
      /
      {{ dataForm().value().nome }}
    </h2>

    @let mt = 'mt-10';

    <mat-dialog-content class="mat-typography">
      <form>
        <mat-tab-group>
          <mat-tab label="Dados Pessoais">
            <div [class]="mt">
              <div class="grid grid-cols-6 gap-2">
                <mat-form-field class="col-span-4" [appearance]="formAparence">
                  <mat-label>Id</mat-label>
                  <input matInput [formField]="dataForm.id" />
                  <mat-icon matPrefix>badge</mat-icon>
                </mat-form-field>

                <div class="col-span-2">
                  <mat-checkbox [formField]="dataForm.ativo">Ativo</mat-checkbox>
                  <app-form-errors [errors]="dataForm.ativo().errors()" />
                </div>
              </div>

              <div class="grid grid-cols-6 gap-2">
                @if (departamentos() && departamentos().length > 0 && !departamentoIsLoading()) {
                  <mat-form-field class="col-span-6 md:col-span-3" [appearance]="formAparence">
                    <mat-label>Departamento</mat-label>
                    <mat-select
                    [formField]="dataForm.departamento"
                    [compareWith]="compareDepartamentos"
                    >
                      @for (item of departamentos(); track item.id) {
                        <mat-option [value]="item">{{ item.nome }}</mat-option>
                      }
                    </mat-select>
                    <app-form-errors [errors]="dataForm.departamento().errors()" />
                  </mat-form-field>
                } @else {
                  <div
                    class="col-span-6 md:col-span-3 w-full h-14 mb-5 bg-gray-300 border-b rounded-t-sm"
                  >
                    <div class="w-full h-full flex justify-center items-center animate-spin">
                      <mat-icon>autorenew</mat-icon>
                    </div>
                  </div>
                }
              </div>

              <div class="grid grid-cols-6 gap-2">
                <mat-form-field class="col-span-6" [appearance]="formAparence">
                  <mat-label>Nome</mat-label>
                  <input matInput [formField]="dataForm.nome" />
                  <mat-icon matPrefix>person</mat-icon>
                  <app-form-errors [errors]="dataForm.nome().errors()" />
                </mat-form-field>
              </div>

              <div class="grid grid-cols-6 gap-2">
                <mat-form-field class="col-span-6 md:col-span-3" [appearance]="formAparence">
                  <mat-label>CPF</mat-label>
                  <input matInput type="text" [formField]="dataForm.cpf" mask="000.000.000-00" />
                  <app-form-errors [errors]="dataForm.cpf().errors()" />
                </mat-form-field>
              </div>

              <div class="grid grid-cols-6 gap-2">
                <mat-form-field class="col-span-6 md:col-span-3" [appearance]="formAparence">
                  <mat-label>Data Nascimento</mat-label>
                  <input matInput type="date" [formField]="dataForm.dataNascimento" />
                  <app-form-errors [errors]="dataForm.dataNascimento().errors()" />
                </mat-form-field>
              </div>

              <div class="grid grid-cols-6 gap-2">
                <mat-form-field class="col-span-6" [appearance]="formAparence">
                  <mat-label>Nome Mae</mat-label>
                  <input matInput [formField]="dataForm.nomeMae" />
                  <app-form-errors [errors]="dataForm.nomeMae().errors()" />
                </mat-form-field>
              </div>

              <div class="grid grid-cols-6 gap-2">
                <mat-form-field class="col-span-6 md:col-span-3" [appearance]="formAparence">
                  <mat-label>Nacionalidade</mat-label>
                  <input matInput [formField]="dataForm.nacionalidade" />
                  <app-form-errors [errors]="dataForm.nacionalidade().errors()" />
                </mat-form-field>
              </div>

              <div class="grid grid-cols-6 gap-2">
                <mat-form-field class="col-span-6 md:col-span-3" [appearance]="formAparence">
                  <mat-label>Naturalidade</mat-label>
                  <input matInput [formField]="dataForm.naturalidade" />
                  <app-form-errors [errors]="dataForm.naturalidade().errors()" />
                </mat-form-field>
              </div>

              <div class="grid grid-cols-6 gap-2">
                <mat-form-field class="col-span-6 md:col-span-3" [appearance]="formAparence">
                  <mat-label>Genero</mat-label>

                  <mat-select [formField]="dataForm.genero">
                    <mat-option value="M">Masculino</mat-option>
                    <mat-option value="F">Feminino</mat-option>
                  </mat-select>

                  <app-form-errors [errors]="dataForm.genero().errors()" />
                </mat-form-field>
              </div>

              <div class="grid grid-cols-6 gap-2">
                <mat-form-field class="col-span-6 md:col-span-3" [appearance]="formAparence">
                  <mat-label>Raca Cor</mat-label>
                  <mat-select [formField]="dataForm.racaCor">
                    @for (item of racaCorSelect(); track $index) {
                      <mat-option [value]="item.valor">{{ item.label }}</mat-option>
                    }
                  </mat-select>
                  <app-form-errors [errors]="dataForm.racaCor().errors()" />
                </mat-form-field>
              </div>

              <div class="grid grid-cols-6 gap-2">
                <mat-form-field class="col-span-6 md:col-span-3" [appearance]="formAparence">
                  <mat-label>Estado Civil</mat-label>
                  <mat-select [formField]="dataForm.estadoCivil">
                    @for (item of estadoCivilSelect(); track $index) {
                      <mat-option [value]="item.valor">{{ item.label }}</mat-option>
                    }
                  </mat-select>
                  <app-form-errors [errors]="dataForm.estadoCivil().errors()" />
                </mat-form-field>
              </div>
            </div>
          </mat-tab>
          <mat-tab label="Documentação">
            <div [class]="mt">
              <div class="grid grid-cols-6 gap-2">
                <mat-form-field class="col-span-6 md:col-span-3" [appearance]="formAparence">
                  <mat-label>Rg</mat-label>
                  <input matInput [formField]="dataForm.rg" />
                  <app-form-errors [errors]="dataForm.rg().errors()" />
                </mat-form-field>
              </div>
              <div class="grid grid-cols-6 gap-2">
                <mat-form-field class="col-span-6 md:col-span-3" [appearance]="formAparence">
                  <mat-label>Ctps</mat-label>
                  <input matInput [formField]="dataForm.ctpsDigital" />
                  <app-form-errors [errors]="dataForm.ctpsDigital().errors()" />
                </mat-form-field>
              </div>

              <div class="grid grid-cols-6 gap-2">
                <mat-form-field class="col-span-6 md:col-span-3" [appearance]="formAparence">
                  <mat-label>Pis/Pasep</mat-label>
                  <mat-icon matPrefix>search</mat-icon>
                  <input matInput [formField]="dataForm.pisPasep" />
                  <app-form-errors [errors]="dataForm.pisPasep().errors()" />
                </mat-form-field>
              </div>

              <div class="grid grid-cols-6 gap-2">
                <mat-form-field class="col-span-6 md:col-span-3" [appearance]="formAparence">
                  <mat-label>Titulo Eleitor</mat-label>
                  <mat-icon matPrefix>search</mat-icon>
                  <input matInput [formField]="dataForm.tituloEleitor" />
                  <app-form-errors [errors]="dataForm.tituloEleitor().errors()" />
                </mat-form-field>
              </div>

              <div class="grid grid-cols-6 gap-2">
                <mat-form-field class="col-span-6 md:col-span-3" [appearance]="formAparence">
                  <mat-label>Reservista</mat-label>
                  <input matInput [formField]="dataForm.certificadoReservista" />
                  <app-form-errors [errors]="dataForm.certificadoReservista().errors()" />
                </mat-form-field>
              </div>
            </div>
          </mat-tab>

          <mat-tab label="Endereço">
            <div [class]="mt">
              <div class="grid grid-cols-6 gap-2">
                <mat-form-field class="col-span-6" [appearance]="formAparence">
                  <mat-label>Endereço</mat-label>
                  <mat-icon matPrefix>home</mat-icon>
                  <input matInput [formField]="dataForm.endereco" />
                  <app-form-errors [errors]="dataForm.endereco().errors()" />
                </mat-form-field>
              </div>
              <div class="grid grid-cols-6 gap-2">
                <mat-form-field class="col-span-6" [appearance]="formAparence">
                  <mat-label>Bairro</mat-label>
                  <input matInput [formField]="dataForm.bairro" />
                  <app-form-errors [errors]="dataForm.bairro().errors()" />
                </mat-form-field>
              </div>

              <div class="grid grid-cols-6 gap-2">
                <mat-form-field class="col-span-6" [appearance]="formAparence">
                  <mat-label>Cidade</mat-label>
                  <mat-icon matPrefix>location_city</mat-icon>
                  <input matInput [formField]="dataForm.cidade" />
                  <app-form-errors [errors]="dataForm.cidade().errors()" />
                </mat-form-field>
              </div>

              <div class="grid grid-cols-6 gap-2">
                <mat-form-field class="col-span-6 md:col-span-3" [appearance]="formAparence">
                  <mat-label>CEP</mat-label>
                  <input matInput [formField]="dataForm.cep" mask="00000-000" />
                  <app-form-errors [errors]="dataForm.cep().errors()" />
                </mat-form-field>
              </div>

              <div class="grid grid-cols-6 gap-2">
                <mat-form-field class="col-span-6 md:col-span-3" [appearance]="formAparence">
                  <mat-label>Telefone</mat-label>
                  <mat-icon matPrefix>phone</mat-icon>
                  <input matInput [formField]="dataForm.telefone" mask="(00) 00000-0000" />

                  <app-form-errors [errors]="dataForm.telefone().errors()" />
                </mat-form-field>
              </div>

              <div class="grid grid-cols-6 gap-2">
                <mat-form-field class="col-span-6 md:col-span-3" [appearance]="formAparence">
                  <mat-label>Celular</mat-label>
                  <mat-icon matPrefix>phone</mat-icon>
                  <input matInput [formField]="dataForm.celular" mask="(00) 00000-0000" />
                  <app-form-errors [errors]="dataForm.celular().errors()" />
                </mat-form-field>
              </div>
              <div class="grid grid-cols-6 gap-2">
                <mat-form-field class="col-span-6" [appearance]="formAparence">
                  <mat-label>Email</mat-label>
                  <mat-icon matPrefix>email</mat-icon>
                  <input matInput [formField]="dataForm.email" />
                  <app-form-errors [errors]="dataForm.email().errors()" />
                </mat-form-field>
              </div>
            </div>
          </mat-tab>

          <mat-tab label="Dados Contratuais e Profissionais">
            <div [class]="mt">
              <div class="grid grid-cols-6 gap-2">
                <mat-form-field class="col-span-6 md:col-span-3" [appearance]="formAparence">
                  <mat-label>Data Admissão</mat-label>
                  <input matInput type="date" [formField]="dataForm.dataAdmissao" />
                  <app-form-errors [errors]="dataForm.dataAdmissao().errors()" />
                </mat-form-field>
              </div>

              <div class="grid grid-cols-6 gap-2">
                <mat-form-field class="col-span-6 md:col-span-3" [appearance]="formAparence">
                  <mat-label>Cargo/Função Desempenhada</mat-label>
                  <input matInput [formField]="dataForm.cargoFuncaoDesempenhada" />
                  <app-form-errors [errors]="dataForm.cargoFuncaoDesempenhada().errors()" />
                </mat-form-field>
              </div>

              <div class="grid grid-cols-6 gap-2">
                <mat-form-field class="col-span-6" [appearance]="formAparence">
                  <mat-label>Categoria Trabalhador</mat-label>
                  <mat-select [formField]="dataForm.categoriaTrabalhador">
                    @for (item of categoriaTrabalhadorSelect(); track $index) {
                      <mat-option [value]="item.valor">{{ item.label }}</mat-option>
                    }
                  </mat-select>
                  <app-form-errors [errors]="dataForm.categoriaTrabalhador().errors()" />
                </mat-form-field>
              </div>

              <div class="grid grid-cols-6 gap-2">
                <mat-form-field class="col-span-6 md:col-span-3" [appearance]="formAparence">
                  <mat-label>Tipo Contrato</mat-label>
                  <mat-select [formField]="dataForm.tipoContrato">
                    @for (item of tipoContratoSelect(); track $index) {
                      <mat-option [value]="item.valor">{{ item.label }}</mat-option>
                    }
                  </mat-select>
                  <app-form-errors [errors]="dataForm.tipoContrato().errors()" />
                </mat-form-field>
              </div>

              <div class="grid grid-cols-6 gap-2">
                <mat-form-field class="col-span-6 md:col-span-3" [appearance]="formAparence">
                  <mat-label>Jornada de Trabalho</mat-label>
                  <input matInput [formField]="dataForm.jornadaTrabalho" />
                  <app-form-errors [errors]="dataForm.jornadaTrabalho().errors()" />
                </mat-form-field>
              </div>

              <div class="grid grid-cols-6 gap-2">
                <mat-form-field class="col-span-6 md:col-span-3" [appearance]="formAparence">
                  <mat-label>Vinculo Sindicato</mat-label>
                  <input matInput [formField]="dataForm.vinculoSindicato" />
                  <app-form-errors [errors]="dataForm.vinculoSindicato().errors()" />
                </mat-form-field>
              </div>

              <div class="grid grid-cols-6 gap-2">
                <mat-form-field class="col-span-6 md:col-span-3" [appearance]="formAparence">
                  <mat-label>Departamento/Centro de Custo</mat-label>
                  <input matInput [formField]="dataForm.departamentoCentroCusto" />
                  <app-form-errors [errors]="dataForm.departamentoCentroCusto().errors()" />
                </mat-form-field>
              </div>
            </div>
          </mat-tab>

          <mat-tab label="Dados de Remuneração e Bancários">
            <div [class]="mt">
              <div class="grid grid-cols-6 gap-2">
                <mat-form-field class="col-span-6 md:col-span-3" [appearance]="formAparence">
                  <mat-label>Salário Base</mat-label>
                  <mat-icon matPrefix>attach_money</mat-icon>
                  <input matInput type="number" [formField]="dataForm.salarioBase" />
                  <app-form-errors [errors]="dataForm.salarioBase().errors()" />
                </mat-form-field>
              </div>

              <div class="grid grid-cols-6 gap-2">
                <mat-form-field class="col-span-6 md:col-span-3" [appearance]="formAparence">
                  <mat-label>Tipo Conta</mat-label>
                  <mat-select [formField]="dataForm.tipoConta">
                    @for (item of tipoContaSelect(); track $index) {
                      <mat-option [value]="item.valor">{{ item.label }}</mat-option>
                    }
                  </mat-select>
                  <app-form-errors [errors]="dataForm.tipoConta().errors()" />
                </mat-form-field>
              </div>

              <div class="grid grid-cols-6 gap-2">
                <mat-form-field class="col-span-6 md:col-span-3" [appearance]="formAparence">
                  <mat-label>Tipo Banco</mat-label>
                  <input matInput [formField]="dataForm.banco" />
                  <app-form-errors [errors]="dataForm.banco().errors()" />
                </mat-form-field>
              </div>

              <div class="grid grid-cols-6 gap-2">
                <mat-form-field class="col-span-6 md:col-span-3" [appearance]="formAparence">
                  <mat-label>Agência</mat-label>
                  <input matInput [formField]="dataForm.agencia" />
                  <app-form-errors [errors]="dataForm.agencia().errors()" />
                </mat-form-field>
              </div>

              <div class="grid grid-cols-6 gap-2">
                <mat-form-field class="col-span-6 md:col-span-3" [appearance]="formAparence">
                  <mat-label>Conta</mat-label>
                  <input matInput [formField]="dataForm.conta" />
                  <app-form-errors [errors]="dataForm.conta().errors()" />
                </mat-form-field>
              </div>
            </div>
          </mat-tab>

          <mat-tab label="Informações de Benefícios e Saúde">
            <div [class]="mt">
              <div class="grid grid-cols-6 gap-2">
                <mat-form-field class="col-span-6 md:col-span-3" [appearance]="formAparence">
                  <mat-label>Plano de Saude</mat-label>
                  <input matInput [formField]="dataForm.planoSaude" />
                  <app-form-errors [errors]="dataForm.planoSaude().errors()" />
                </mat-form-field>
              </div>

              <div class="grid grid-cols-6 gap-2">
                <mat-form-field class="col-span-6 md:col-span-3" [appearance]="formAparence">
                  <mat-label>Plano Odontológico</mat-label>
                  <input matInput [formField]="dataForm.planoOdontologico" />
                  <app-form-errors [errors]="dataForm.planoOdontologico().errors()" />
                </mat-form-field>
              </div>

              <div class="grid grid-cols-6 gap-2">
                <mat-form-field class="col-span-6 md:col-span-3" [appearance]="formAparence">
                  <mat-label>Plano de Saude</mat-label>
                  <input matInput [formField]="dataForm.valeTransporte" />
                  <app-form-errors [errors]="dataForm.valeTransporte().errors()" />
                </mat-form-field>
              </div>
              <div class="grid grid-cols-6 gap-2">
                <mat-form-field class="col-span-6 md:col-span-3" [appearance]="formAparence">
                  <mat-label>Insalubridade</mat-label>
                  <input matInput [formField]="dataForm.insalubridade" />
                  <app-form-errors [errors]="dataForm.insalubridade().errors()" />
                </mat-form-field>
              </div>

              <div class="grid grid-cols-6 gap-2">
                <mat-form-field class="col-span-6 md:col-span-3" [appearance]="formAparence">
                  <mat-label>Suporte Top Ponto</mat-label>
                  <input matInput [formField]="dataForm.suporteTopPonto" />
                  <app-form-errors [errors]="dataForm.suporteTopPonto().errors()" />
                </mat-form-field>
              </div>
            </div>
          </mat-tab>

          <mat-tab label="Layout Folha sefip 84">
            <div [class]="mt">
              <div class="grid grid-cols-6 gap-2">
                <mat-form-field class="col-span-6 md:col-span-3" [appearance]="formAparence">
                  <mat-label>Matricula</mat-label>
                  <input matInput type="text" [formField]="dataForm.matricula" />
                  <app-form-errors [errors]="dataForm.matricula().errors()" />
                </mat-form-field>
              </div>

              <div class="grid grid-cols-6 gap-2">
                <mat-form-field class="col-span-3 md:col-span-3" [appearance]="formAparence">
                  <mat-label>Ctps</mat-label>
                  <input matInput [formField]="dataForm.ctps" />
                  <app-form-errors [errors]="dataForm.ctps().errors()" />
                </mat-form-field>
                <mat-form-field class="col-span-3 md:col-span-3" [appearance]="formAparence">
                  <mat-label>Serie Ctps</mat-label>
                  <input matInput [formField]="dataForm.serieCtps" />
                  <app-form-errors [errors]="dataForm.serieCtps().errors()" />
                </mat-form-field>
              </div>

              <div class="grid grid-cols-6 gap-2">
                <mat-form-field class="col-span-6 md:col-span-3" [appearance]="formAparence">
                  <mat-label>Data Opcao</mat-label>
                  <input matInput type="text" [formField]="dataForm.dataOpcao" mask="00/00/0000" />
                  <app-form-errors [errors]="dataForm.dataOpcao().errors()" />
                </mat-form-field>
              </div>

              <div class="grid grid-cols-6 gap-2">
                <mat-form-field class="col-span-6 md:col-span-3" [appearance]="formAparence">
                  <mat-label>CBO</mat-label>
                  <input matInput [formField]="dataForm.cbo" type="text" mask="0-0000" />
                  <app-form-errors [errors]="dataForm.cbo().errors()" />
                </mat-form-field>
              </div>

              <div class="grid grid-cols-6 gap-2">
                <mat-form-field class="col-span-6 md:col-span-3" [appearance]="formAparence">
                  <mat-label>Classe de contribuicao</mat-label>
                  <input matInput [formField]="dataForm.classeDeContribuicao" />
                  <app-form-errors [errors]="dataForm.classeDeContribuicao().errors()" />
                </mat-form-field>
              </div>

              <div class="grid grid-cols-6 gap-2">
                <mat-form-field class="col-span-6" [appearance]="formAparence">
                  <mat-label>Ocorrencia</mat-label>
                  <mat-select [formField]="dataForm.ocorrencia">
                    @for (item of ocorrenciaSelect(); track $index) {
                      <mat-option [value]="item.valor">{{ item.label }}</mat-option>
                    }
                  </mat-select>
                  <app-form-errors [errors]="dataForm.ocorrencia().errors()" />
                </mat-form-field>
              </div>
            </div>
          </mat-tab>
        </mat-tab-group>
      </form>
    </mat-dialog-content>
    <!-- 'text' | 'filled' | 'elevated' | 'outlined' | 'tonal' -->
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
export class FuncionarioForm {
  dialogRef = inject(MatDialogRef<FuncionarioForm>);
  data = inject<any>(MAT_DIALOG_DATA);
  formAparence: 'fill' | 'outline' = 'fill';
  formOpcao = signal<string>('');
  empresaStore = inject(EmpresaStore);
  departamentoStore = inject(DepartamentoStore);
  departamentos = signal<DepartamentoModel[]>([]);
  departamentoIsLoading = signal(true);

  compareDepartamentos(o1: any, o2: any): boolean {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

  constructor() {
    setTimeout(() => {
      this.departamentoIsLoading.set(false);
    }, 1000);
    effect(() => {
      this.departamentos.set(this.departamentoStore.list());
    });
  }

  ngOnInit() {
    const { data } = this.data;
    this.fb.set(data as FuncionarioModel);
    this.dataForm().markAsDirty();
    this.dataForm().markAsTouched();
    this.formOpcao.set(this.data.opcao);
    this.departamentos.set(this.departamentoStore.list());
  }

  private fb = signal<FuncionarioModel>(FUNCIONARIO_MODEL_EMPTY);

  dataForm = form<FuncionarioModel>(this.fb, (fields) => {
    disabled(fields.id);
    required(fields.nome, { message: 'Requerido' });
    required(fields.departamento, { message: 'Requerido' });
    required(fields.dataNascimento, { message: 'Requerido' });
    required(fields.nacionalidade, { message: 'Requerido' });
    required(fields.naturalidade, { message: 'Requerido' });
    required(fields.racaCor, { message: 'Requerido' });
    required(fields.estadoCivil, { message: 'Requerido' });
    required(fields.dataAdmissao, { message: 'Requerido' });
    required(fields.salarioBase, { message: 'Requerido' });
    email(fields.email, { message: 'Email invalido' });
  });

  onSubmit() {
    const ret = {
      ...this.dataForm().value(),
      empresa: this.empresaStore.empresaLogada()?.id as string,
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
