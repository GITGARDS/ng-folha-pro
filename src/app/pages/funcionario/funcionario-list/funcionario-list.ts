import { CurrencyPipe, DatePipe } from "@angular/common";
import { Component, effect, inject, viewChild } from "@angular/core";
import { MatIconButton } from "@angular/material/button";
import { MatCard } from "@angular/material/card";
import { MatIcon } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { TableFilter } from "../../../core/table-filter";
import { FuncionarioModel } from "../shared/funcionario.model";
import { FuncionarioStore } from "../shared/funcionario.store";

@Component({
  selector: 'app-funcionario-list',
  imports: [
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    TableFilter,
    MatMenuModule,
    MatIcon,
    MatIconButton,
    CurrencyPipe,
    DatePipe,
    MatCard,
  ],
  template: `
    <div class="h-full flex flex-col justify-between">
      <section>
        <app-table-filter (applyFilter)="applyFilter($event)" (onCreate)="onCreate($event)" />

        <mat-card class="py-2" appearance="outlined">
          <div class="h-[60vh] overflow-auto">
            <table mat-table [dataSource]="dataSource" matSort>
              <!-- Id Column -->
              <ng-container matColumnDef="id">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Id</th>
                <td mat-cell *matCellDef="let row">{{ row.id }}</td>
              </ng-container>
              <!-- empresa Column -->
              <ng-container matColumnDef="empresa">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Empresa</th>
                <td mat-cell *matCellDef="let row">{{ row.empresa }}</td>
              </ng-container>
              <!-- Nome Column -->
              <ng-container matColumnDef="nome">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Nome</th>
                <td mat-cell *matCellDef="let row">
                  {{ row.nome }}
                </td>
              </ng-container>

              <!-- Salario Base Column -->
              <ng-container matColumnDef="salarioBase">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Salario</th>
                <td mat-cell *matCellDef="let row">{{ row.salarioBase | currency: 'BRL' }}</td>
              </ng-container>

              <!-- Data Admissao Column -->
              <ng-container matColumnDef="dataAdmissao">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Admissao</th>
                <td mat-cell *matCellDef="let row">{{ row.dataAdmissao | date: 'dd/MM/yyyy' }}</td>
              </ng-container>

              <!-- Status Column -->
              <ng-container matColumnDef="ativo">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Ativo</th>
                <td mat-cell *matCellDef="let row">{{ row.ativo }}</td>
              </ng-container>

              <!-- Actions Column -->
              <ng-container matColumnDef="actions" stickyEnd>
                <th mat-header-cell *matHeaderCellDef>
                  <mat-icon>menu</mat-icon>
                </th>
                <td mat-cell *matCellDef="let row">
                  <button
                    matIconButton
                    [matMenuTriggerFor]="menu"
                    aria-label="Example icon-button with a menu"
                  >
                    <mat-icon>more_vert</mat-icon>
                  </button>
                  <mat-menu #menu="matMenu">
                    <button mat-menu-item (click)="onUpdateById(row)">
                      <mat-icon>edit</mat-icon>
                      <span>Editar</span>
                    </button>
                    <button mat-menu-item (click)="onDeleteById(row.id)">
                      <mat-icon>delete</mat-icon>
                      <span>Excluir</span>
                    </button>
                  </mat-menu>
                </td>
              </ng-container>

              <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
            </table>
          </div>
        </mat-card>
      </section>

      <section>
        <mat-paginator #paginator [pageSize]="20" [pageSizeOptions]="[5, 10, 25, 100]">
        </mat-paginator>
      </section>
    </div>
  `,
  styles: ``,
})
export class FuncionarioList {
  funcionarioStore = inject(FuncionarioStore);

  dataSource = new MatTableDataSource<FuncionarioModel>([]);
  readonly paginator = viewChild.required(MatPaginator);
  readonly sort = viewChild.required(MatSort);

  displayedColumns: string[] = [
    // 'id',
    // 'empresa',
    'nome',
    'salarioBase',
    'dataAdmissao',
    'ativo',
    'actions',
  ];

  constructor() {
    effect(() => {
      this.dataSource.data = this.funcionarioStore.list();
      setTimeout(() => {
        this.dataSource.paginator = this.paginator();
        this.dataSource.sort = this.sort();
      }, 100);
    });
  }
  onCreate(opcao: string) {
    if (confirm('Deseja realmente criar?')) {
      const novoData = {
        id: (this.funcionarioStore.list().length + 1).toString(),
        nome: ('Novo' + this.funcionarioStore.list().length + 1).toString(),
      };
      this.funcionarioStore.create({
        data: novoData,
      });
    }
  }

  onUpdateById(data: any) {
    console.log('update', data);
    if (confirm('Deseja realmente alterar?')) {
      const dataUpdate = { ...data, nome: 'Alterado Para' + data };
      this.funcionarioStore.updateById({
        id: data,
        data: dataUpdate,
      });
    }
  }
  onDeleteById(id: string) {
    if (confirm('Deseja realmente excluir?')) {
      console.log('delete', id);
      this.funcionarioStore.deleteById(id);
    }
  }

  applyFilter($event: Event) {
    const filterValue = ($event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
