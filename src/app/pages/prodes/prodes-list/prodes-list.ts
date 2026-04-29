import { Component, effect, inject, viewChild } from "@angular/core";
import { MatIconButton } from "@angular/material/button";
import { MatCard } from "@angular/material/card";
import { MatDialog } from "@angular/material/dialog";
import { MatIcon } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { TableFilter } from "../../../core/table-filter";
import { ProdesForm } from "../prodes-form";
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
    MatCard,
  ],
  template: `
    <div class="h-full flex flex-col justify-between gap-2">
      <section class="flex flex-col gap-2">
        <app-table-filter (applyFilter)="applyFilter($event)" (onCreate)="onCreate()" />

        <mat-card class="py-2" appearance="outlined">
          <div class="h-[60vh] overflow-auto">
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

              <tr mat-header-row *matHeaderRowDef="displayedColumns; sticky: true"></tr>
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
  readonly dialog = inject(MatDialog);
  onCreate() {
    const ultimoProdes = this.prodesStore.list().length + 1;

    const novo: Partial<ProdesModel> = {
      codigo: `P${ultimoProdes}`,
      descricao: `prodes ultimo ${ultimoProdes}`,
      tipo: 'provento',
      incidencias: ['INSS', 'FGTS', 'IRRF'],
      automatico: true,
      ativo: true,
    };
    this.openDialog('new', novo as ProdesModel);
  }
  onUpdateById(params: ProdesModel) {
    this.openDialog('update', params);
  }

  openDialog(opcao: string, data: ProdesModel) {
    const dialogRef = this.dialog.open(ProdesForm, {
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
          this.prodesStore.create({
            data: result as ProdesModel,
          });
          break;
        case 'update':
          this.prodesStore.updateById({
            id: data.id as string,
            data: result as ProdesModel,
          });
          break;
      }
    });
  }
  onDeleteById(id: string) {
    if (confirm('Deseja realmente excluir?')) {
      this.prodesStore.deleteById({ id });
    }
  }

  applyFilter($event: Event) {
    const filterValue = ($event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
