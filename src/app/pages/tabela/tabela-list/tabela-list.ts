import { Component, effect, inject, viewChild } from "@angular/core";
import { MatIconButton } from "@angular/material/button";
import { MatCard } from "@angular/material/card";
import { MatDialog } from "@angular/material/dialog";
import { MatIcon } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { TableFilter } from "../../../core/components/table-filter";
import { MOCK_TABELAS, TabelaModel } from "../shared/tabela.model";
import { TabelaStore } from "../shared/tabela.store";
import { TabelaForm } from "../tabela-form";

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
    MatCard,
  ],
  template: `
    <div class="h-full flex flex-col justify-between gap-2">
      <section class="flex flex-col gap-2">
        <app-table-filter (applyFilter)="applyFilter($event)" (onCreate)="onCreate()" />

        <mat-card class="py-2" appearance="outlined">
          <div class="h-[60vh] overflow-auto">
            <table mat-table [dataSource]="dataSource" matSort>
              <!-- Id Column -->
              <ng-container matColumnDef="id">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Id</th>
                <td mat-cell *matCellDef="let row">
                  {{ row.id }}
                </td>
              </ng-container>
              <!-- Nome Column -->
              <ng-container matColumnDef="nome">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Nome</th>
                <td mat-cell *matCellDef="let row; let i = index">
                  {{ row.nome }}
                </td>
              </ng-container>
              <!-- Nome Column -->
              <ng-container matColumnDef="referencia">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Referencia</th>
                <td mat-cell *matCellDef="let row; let i = index">
                  <div class="flex items-center gap-2">
                    @if (i === 0) {
                      <div class="size-3 animate-pulse">
                        <p class="w-full h-full bg-blue-900 rounded-full"></p>
                      </div>
                    } @else {
                      <div class="size-3"></div>
                    }
                    <span>
                      {{ row.referencia }}
                    </span>
                  </div>
                </td>
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
        <mat-paginator #paginator [pageSize]="5" [pageSizeOptions]="[5, 10, 25, 100]">
        </mat-paginator>
      </section>
    </div>
  `,
  styles: ``,
})
export class TabelaList {
  tabelaStore = inject(TabelaStore);

  dataSource = new MatTableDataSource<TabelaModel>([]);
  readonly paginator = viewChild.required(MatPaginator);
  readonly sort = viewChild.required(MatSort);

  displayedColumns: string[] = [
    // 'id',
    'referencia',
    'nome',
    'actions',
  ];

  constructor() {
    effect(() => {
      this.dataSource.data = this.tabelaStore.list();
      setTimeout(() => {
        this.dataSource.paginator = this.paginator();
        this.dataSource.sort = this.sort();
      }, 100);
    });
  }
  onCreate() {
    const ultimoTabela = this.tabelaStore.list().length + 1;
    const novo: Partial<TabelaModel> = MOCK_TABELAS[0];
    this.openDialog('new', novo as TabelaModel);
  }
  onUpdateById(params: TabelaModel) {
    this.openDialog('update', params);
  }
  readonly dialog = inject(MatDialog);
  openDialog(opcao: string, data: Partial<TabelaModel>) {
    const dialogRef = this.dialog.open(TabelaForm, {
      width: 'auto',
      height: '750px',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data: { opcao, data },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }
      switch (opcao) {
        case 'new':
          this.tabelaStore.create({
            data: result as TabelaModel,
          });
          break;
        case 'update':
          this.tabelaStore.updateById({
            id: data.id as string,
            data: result as TabelaModel,
          });
          break;
      }
    });
  }

  onDeleteById(id: string) {
    if (confirm('Deseja realmente excluir?')) {
      console.log('delete', id);
      this.tabelaStore.deleteById({ id });
    }
  }

  applyFilter($event: Event) {
    const filterValue = ($event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
