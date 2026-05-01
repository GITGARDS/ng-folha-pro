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
import { DepartamentoForm } from "../departamento-form";
import { DepartamentoModel } from "../shared/departamento.model";
import { DepartamentoStore } from "../shared/departamento.store";

@Component({
  selector: 'app-departamento-list',
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
                <td mat-cell *matCellDef="let row">{{ row.id }}</td>
              </ng-container>
              <!-- nomeDepartamentoRazaoSocial Column -->
              <ng-container matColumnDef="nome">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Nome</th>
                <td mat-cell *matCellDef="let row">
                  {{ row.nome }}
                </td>
              </ng-container>
              <!-- dataAbertura Column -->
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
        <mat-paginator #paginator [pageSize]="5" [pageSizeOptions]="[5, 10, 25, 100]">
        </mat-paginator>
      </section>
    </div>
  `,
  styles: ``,
})
export class DepartamentoList {
  departamentoStore = inject(DepartamentoStore);

  dataSource = new MatTableDataSource<DepartamentoModel>([]);
  readonly paginator = viewChild.required(MatPaginator);
  readonly sort = viewChild.required(MatSort);

  displayedColumns: string[] = [
    // 'id', 
    'nome', 'ativo', 'actions'];

  constructor() {
    effect(() => {
      this.dataSource.data = this.departamentoStore.list();
      setTimeout(() => {
        this.dataSource.paginator = this.paginator();
        this.dataSource.sort = this.sort();
      }, 100);
    });
  }

  readonly dialog = inject(MatDialog);
  onCreate() {
    const ultimoDepartamento = this.departamentoStore.list().length + 1;
    const novo: Partial<DepartamentoModel> = {
      nome: `nome ${ultimoDepartamento}`,
    };
    this.openDialog('new', novo as DepartamentoModel);
  }

  onUpdateById(params: DepartamentoModel) {
    this.openDialog('update', params);
  }

  openDialog(opcao: string, data: DepartamentoModel) {
    const dialogRef = this.dialog.open(DepartamentoForm, {
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
          this.departamentoStore.create({
            data: result as DepartamentoModel,
          });

          break;
        case 'update':
          this.departamentoStore.updateById({
            id: data.id as string,
            data: result as DepartamentoModel,
          });
          break;
      }
    });
  }
  onDeleteById(id: string) {
    if (confirm('Deseja realmente excluir?')) {
      console.log('delete', id);
      this.departamentoStore.deleteById({ id });
    }
  }

  applyFilter($event: Event) {
    const filterValue = ($event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
