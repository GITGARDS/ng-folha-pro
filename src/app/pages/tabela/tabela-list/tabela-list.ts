import { Component, effect, inject, viewChild } from "@angular/core";
import { MatIconButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { TableFilter } from "../../../core/table-filter";
import { TabelaModel } from "../shared/tabela.model";
import { TabelaStore } from "../shared/tabela.store";

@Component({
  selector: 'app-tabela-list',
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
        <ng-container matColumnDef="id">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>Id</th>
          <td mat-cell *matCellDef="let row">{{ row.id }}</td>
        </ng-container>

        <ng-container matColumnDef="nome">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>Nome</th>
          <td mat-cell *matCellDef="let row">{{ row.nome }}</td>
        </ng-container>

        <ng-container matColumnDef="ativo">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>Ativo</th>
          <td mat-cell *matCellDef="let row">{{ row.ativo }}</td>
        </ng-container>

        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef>Actions</th>
          <td mat-cell *matCellDef="let row">
            <button
              matIconButton
              [matMenuTriggerFor]="menu"
              aria-label="Example icon-button with a menu"
            >
              <mat-icon>more_vert</mat-icon>
            </button>
            <mat-menu #menu="matMenu">
              <button mat-menu-item (click)="onUpdateById(row.id)">
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
export class TabelaList {
  tabelaStore = inject(TabelaStore);

  dataSource = new MatTableDataSource<TabelaModel>([]);
  readonly paginator = viewChild.required(MatPaginator);
  readonly sort = viewChild.required(MatSort);

  displayedColumns = ['id', 'nome', 'ativo', 'actions'];

  constructor() {
    effect(() => {
      this.dataSource.data = this.tabelaStore.list();
      setTimeout(() => {
        this.dataSource.paginator = this.paginator();
        this.dataSource.sort = this.sort();
      }, 100);
    });
  }
  onCreate(opcao: string) {
    if (confirm('Deseja realmente criar?')) {
      const novoData = {
        id: (this.tabelaStore.list().length + 1).toString(),
        nome: ('Novo' + this.tabelaStore.list().length + 1).toString(),
      };
      this.tabelaStore.create({
        data: novoData,
      });
    }
  }

  onUpdateById(data: any) {
    console.log('update', data);
    if (confirm('Deseja realmente alterar?')) {
      const dataUpdate = { ...data, nome: 'Alterado Para' + data };
      this.tabelaStore.updateById({
        id: data,
        data: dataUpdate,
      });
    }
  }
  onDeleteById(id: string) {
    if (confirm('Deseja realmente excluir?')) {
      console.log('delete', id);
      this.tabelaStore.deleteById(id);
    }
  }

  applyFilter($event: Event) {
    const filterValue = ($event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
