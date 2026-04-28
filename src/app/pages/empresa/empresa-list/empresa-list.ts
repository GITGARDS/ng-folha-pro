import { DatePipe } from "@angular/common";
import { Component, effect, inject, viewChild } from "@angular/core";
import { MatIconButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { TableFilter } from "../../../core/table-filter";
import { EmpresaModel } from "../shared/empresa.model";
import { EmpresaStore } from "../shared/empresa.store";

@Component({
  selector: 'app-empresa-list',
  imports: [
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    TableFilter,
    MatMenuModule,
    MatIcon,
    MatIconButton,
    DatePipe,
  ],
  template: `
    <section>
      <app-table-filter (applyFilter)="applyFilter($event)" (onCreate)="onCreate($event)" />
    </section>
    
    <section>
      <table mat-table [dataSource]="dataSource" matSort>
        <!-- Id Column -->
        <ng-container matColumnDef="id">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>Id</th>
          <td mat-cell *matCellDef="let row">{{ row.id }}</td>
        </ng-container>
        <!-- tipoInscricao Column -->
        <ng-container matColumnDef="tipoInscricao">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>Tipo</th>
          <td mat-cell *matCellDef="let row">
            {{ row.tipoInscricao }}
          </td>
        </ng-container>
        <!-- Inscricao Column -->
        <ng-container matColumnDef="inscricao">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>Inscricao</th>
          <td mat-cell *matCellDef="let row">{{ row.inscricao }}</td>
        </ng-container>
        <!-- nomeEmpresaRazaoSocial Column -->
        <ng-container matColumnDef="nomeEmpresaRazaoSocial">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>Nome da Empresa/Razao Social</th>
          <td mat-cell *matCellDef="let row">
            {{ row.nomeEmpresaRazaoSocial }}
          </td>
        </ng-container>
        <!-- dataAbertura Column -->
        <ng-container matColumnDef="dataAbertura">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>Data da Abertura</th>
          <td mat-cell *matCellDef="let row">{{ row.dataAbertura | date: 'dd/MM/yyyy' }}</td>
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
    </section>
    <section>
      <mat-paginator #paginator [pageSize]="5" [pageSizeOptions]="[5, 10, 25, 100]">
      </mat-paginator>
    </section>
  `,
  styles: ``,
})
export class EmpresaList {
  empresaStore = inject(EmpresaStore);

  dataSource = new MatTableDataSource<EmpresaModel>([]);
  readonly paginator = viewChild.required(MatPaginator);
  readonly sort = viewChild.required(MatSort);

  displayedColumns: string[] = [
    'id',
    'tipoInscricao',
    'inscricao',
    'nomeEmpresaRazaoSocial',
    'dataAbertura',
    'actions',
  ];

  constructor() {
    effect(() => {
      this.dataSource.data = this.empresaStore.list();
      setTimeout(() => {
        this.dataSource.paginator = this.paginator();
        this.dataSource.sort = this.sort();
      }, 100);
    });
  }
  onCreate(opcao: string) {
    if (confirm('Deseja realmente criar?')) {
      const novoData = {
        id: (this.empresaStore.list().length + 1).toString(),
        nomeEmpresaRazaoSocial: ('Novo' + this.empresaStore.list().length + 1).toString(),
      };
      this.empresaStore.create({
        data: novoData,
      });
    }
  }

  onUpdateById(data: any) {
    console.log('update', data);
    if (confirm('Deseja realmente alterar?')) {
      const dataUpdate = { ...data, nomeEmpresaRazaoSocial: 'Alterado Para' + data };
      this.empresaStore.updateById({
        id: data,
        data: dataUpdate,
      });
    }
  }
  onDeleteById(id: string) {
    if (confirm('Deseja realmente excluir?')) {
      console.log('delete', id);
      this.empresaStore.deleteById(id);
    }
  }

  applyFilter($event: Event) {
    const filterValue = ($event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
