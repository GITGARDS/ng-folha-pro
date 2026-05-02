import { CurrencyPipe, DatePipe, JsonPipe } from "@angular/common";
import { AfterViewInit, Component, effect, inject, input, viewChild } from "@angular/core";
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

@Component({
  selector: 'app-generics-list',
  imports: [
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    TableFilter,
    MatMenuModule,
    MatIcon,
    MatIconButton,
    MatCard,
    CurrencyPipe,
    DatePipe,
    JsonPipe,
  ],
  template: `
    <div class="h-full flex flex-col justify-between gap-2">
      <section class="flex flex-col gap-2">
        <app-table-filter (applyFilter)="applyFilter($event)" (onCreate)="onCreate()" />

        <mat-card class="py-2" appearance="outlined">
          <div class="h-[60vh] overflow-auto">
            <table mat-table [dataSource]="iDataSource()" matSort>
              <!-- Id Column -->
              @for (item of colunas.filter((f) => f.field !== 'actions'); track $index) {
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
                      @case ('json') {
                        {{ row[item.field] | json }}
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
export class GenericsList implements AfterViewInit {
  iStore = input<any>();
  iFormDialog = input<any>();
  iDataSource = input<MatTableDataSource<any>>(new MatTableDataSource<any>([]) );  
  iDisplayedColumns = input<TableColumnsModel[]>();

  colunas: TableColumnsModel[] = [];  
  displayedColumns: string[] = []; 

  paginator = viewChild(MatPaginator);
  sort = viewChild(MatSort);

  constructor(
  ) {
    effect(() => {
      this.iDataSource().data = this.iStore().list();
      console.log('lista',this.iStore().list());
      setTimeout(() => {
        this.iDataSource().sort = this.sort() as MatSort;
        this.iDataSource().paginator = this.paginator() as MatPaginator;
      }, 700);
    });
  }
  ngAfterViewInit(): void {
    this.displayedColumns = this.iDisplayedColumns()?.filter(f => f.display)?.map((col) => col.field) as string[];    
    this.colunas = this.iDisplayedColumns() as TableColumnsModel[];    
    
  }
  onCreate() {
    const ultimoTabela = this.iStore().list().length + 1;
    const novo: Partial<any> = {} as any;
    this.openDialog('new', novo as any);
  }
  onUpdateById(params: any) {
    this.openDialog('update', params);
  }
  readonly dialog = inject(MatDialog);
  openDialog(opcao: string, data: any) {
    const dialogRef = this.dialog.open(this.iFormDialog(), {
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
          this.iStore().create({
            data: result as any,
          });
          break;
        case 'update':
          this.iStore().updateById({
            id: data.id as string,
            data: result as any,
          });
          break;
      }
    });
  }

  onDeleteById(id: string) {
    if (confirm('Deseja realmente excluir?')) {
      console.log('delete', id);
      this.iStore().deleteById({ id });
    }
  }

  applyFilter($event: Event) {
    const filterValue = ($event.target as HTMLInputElement).value;
    this.iDataSource().filter = filterValue.trim().toLowerCase();
  }
}
