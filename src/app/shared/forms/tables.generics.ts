import { CommonModule, CurrencyPipe, DatePipe } from "@angular/common";
import { AfterViewInit, Component, Inject, effect, inject, viewChild } from "@angular/core";
import { MatIconButton } from "@angular/material/button";
import { MatCard } from "@angular/material/card";
import { MatDialog } from "@angular/material/dialog";
import { MatIcon } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { TableFilter } from "../../core/components/table-filter";
import { TableColumnsModel } from "../models/tablecolumns.model";

interface ITablesGenerics<T> {
  onCreate(): void;
  onUpdateById(params: T): void;
  openDialog(opcao: string, data: any): void;
  onDeleteById(id: string): void;
  applyFilter($event: Event): void;
}

@Component({
  selector: 'app-tables-generics',
  imports: [
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    TableFilter,
    MatMenuModule,
    MatIcon,
    MatIconButton,
    MatCard,
    DatePipe,
    CurrencyPipe,
    CommonModule,
  ],
  template: `
    <div class="h-full flex flex-col justify-between gap-2">
      <section class="flex flex-col gap-2">
        <app-table-filter (applyFilter)="applyFilter($event)" (onCreate)="onCreate()" />

        <mat-card class="py-2" appearance="outlined">
          <div class="h-[60vh] overflow-auto">
            <table mat-table [dataSource]="dataSource" matSort>
              <!-- Id Column -->
              @for (item of displayedColumns.filter((f) => f.field !== 'actions'); track $index) {
                <ng-container [matColumnDef]="item.field">
                  <th mat-header-cell *matHeaderCellDef mat-sort-header>{{ item.label }}</th>

                  <td mat-cell *matCellDef="let row">
                    @switch (item.type) {
                      @case ('date') {
                        {{ row[item.field] | date: 'dd/MM/yyyy' }}
                      }
                      @case ('number') {
                        {{ row[item.field] | currency: 'BRL' }}
                      }
                      @default {
                        {{ row[item.field] }}
                      }
                    }
                  </td>
                </ng-container>
              }

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
export class TablesGenerics<T> implements ITablesGenerics<T>, AfterViewInit {
  store: any;
  dataSource: MatTableDataSource<T, MatPaginator>;
  displayedColumns: TableColumnsModel[];
  colunas: string[] = [];
  formDialog: any;
  readonly paginator = viewChild.required(MatPaginator);
  readonly sort = viewChild.required(MatSort);

  constructor(
    @Inject(Object) store: any,
    @Inject(Array) displayedColumns: TableColumnsModel[],
    @Inject(Object) formDialog: any,
  ) {
    this.store = inject(store);
    this.formDialog = formDialog;
    this.displayedColumns = displayedColumns.filter((f) => f.display === true);
    this.colunas = displayedColumns.map((f) => f.field);
    this.dataSource = new MatTableDataSource<T>([] as T[]);

    effect(() => {
      setTimeout(() => {
        this.dataSource.data = this.store.list();
        console.log(this.dataSource.data);
        this.dataSource.paginator = this.paginator();
        this.dataSource.sort = this.sort();
      }, 2000);
    });
  }
  ngAfterViewInit(): void {}
  onCreate() {
    const novo: Partial<T> = {};
    this.openDialog('new', novo as T);
  }
  onUpdateById(params: T) {
    this.openDialog('update', params);
  }
  readonly dialog = inject(MatDialog);
  openDialog(opcao: string, data: any) {
    const dialogRef = this.dialog.open(this.formDialog, {
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
      const empresaLogada = {
        empresa: {
          id: '1',
        },
      };
      result.empresa = empresaLogada.empresa.id as string;
      switch (opcao) {
        case 'new':
          this.store.create({
            data: result as T,
          });
          break;
        case 'update':
          this.store.updateById({
            id: data.id as string,
            data: result as T,
          });
          break;
      }
    });
  }

  onDeleteById(id: string) {
    if (confirm('Deseja realmente excluir?')) {
      console.log('delete', id);
      this.store.deleteById({ id });
    }
  }

  applyFilter($event: Event) {
    const filterValue = ($event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
