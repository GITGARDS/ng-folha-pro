import { Component, effect, inject, viewChild } from "@angular/core";
import { MatIconButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { TableFilter } from "../../../core/table-filter";
import { ProdesModel } from "../shared/prodes.model";
import { ProdesStore } from "../shared/prodes.store";

@Component({
  selector: 'app-prodes-list',
  imports: [
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    TableFilter,
    MatMenuModule,
    MatIcon,
    MatIconButton,
  ],
  template: `
    <section>
      <app-table-filter (applyFilter)="applyFilter($event)" (onCreate)="onCreate($event)" />
    </section>

    <section>
      <table mat-table [dataSource]="dataSource" matSort>
        <!-- Codigo Column -->
        <ng-container matColumnDef="codigo">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>Codigo</th>
          <td mat-cell *matCellDef="let row">{{ row.codigo }}</td>
        </ng-container>
        <!-- descricao Column -->
        <ng-container matColumnDef="descricao">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>Descricao</th>
          <td mat-cell *matCellDef="let row">
            {{ row.descricao }}
          </td>
        </ng-container>

        <!-- Tipo Column -->
        <ng-container matColumnDef="tipo">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>Tipo</th>
          <td mat-cell *matCellDef="let row">{{ row.tipo }}</td>
        </ng-container>
        <!-- Incidencias Column -->
        <ng-container matColumnDef="incidencias">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>Incidencias</th>
          <td mat-cell *matCellDef="let row">{{ row.incidencias }}</td>
        </ng-container>

        <!-- Automatico Column -->
        <ng-container matColumnDef="automatico">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>Automatico</th>
          <td mat-cell *matCellDef="let row">{{ row.automatico }}</td>
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
    </section>
    <section>
      <mat-paginator #paginator [pageSize]="5" [pageSizeOptions]="[5, 10, 25, 100]">
      </mat-paginator>
    </section>
  `,
  styles: ``,
})
export class ProdesList {
  prodesStore = inject(ProdesStore);

  dataSource = new MatTableDataSource<ProdesModel>([]);
  readonly paginator = viewChild.required(MatPaginator);
  readonly sort = viewChild.required(MatSort);

  displayedColumns: string[] = [
    // 'id',
    'codigo',
    'descricao',
    'tipo',
    'incidencias',
    'automatico',
    'ativo',
    'actions',
  ];

  constructor() {
    effect(() => {
      this.dataSource.data = this.prodesStore.list();
      setTimeout(() => {
        this.dataSource.paginator = this.paginator();
        this.dataSource.sort = this.sort();
      }, 100);
    });
  }
  onCreate(opcao: string) {
    if (confirm('Deseja realmente criar?')) {
      const novoData = {
        id: (this.prodesStore.list().length + 1).toString(),
        descricao: ('Novo' + this.prodesStore.list().length + 1).toString(),
      };
      this.prodesStore.create({
        data: novoData,
      });
    }
  }

  onUpdateById(data: any) {
    console.log('update', data);
    if (confirm('Deseja realmente alterar?')) {
      const dataUpdate = { ...data, descricao: 'Alterado Para' + data };
      this.prodesStore.updateById({
        id: data,
        data: dataUpdate,
      });
    }
  }
  onDeleteById(id: string) {
    if (confirm('Deseja realmente excluir?')) {
      console.log('delete', id);
      this.prodesStore.deleteById(id);
    }
  }

  applyFilter($event: Event) {
    const filterValue = ($event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
