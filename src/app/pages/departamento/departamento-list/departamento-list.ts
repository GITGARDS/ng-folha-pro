import { DataSource } from "@angular/cdk/table";
import { Component, ViewChild, effect, inject } from "@angular/core";
import { MatButton, MatIconButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { TableFilter } from "../../../core/table-filter";
import { DepartamentoModel } from "../shared/departamento.model";
import { DepartamentoStore } from "../shared/departamento.store";

@Component({
  selector: 'app-departamento-list',
  imports: [
    MatTableModule,
    TableFilter,
    MatButton,
    MatPaginatorModule,
    MatMenuModule,
    MatIcon,
    MatIconButton,
  ],
  template: `
    <section>
      <app-table-filter (applyFilter)="applyFilter($event)" />
    </section>

    <section>
      <button matButton="filled" (click)="onCreate('new')">Novo</button>
    </section>

    <section>
      <mat-table [dataSource]="dataSource">
        <ng-container matColumnDef="id">
          <mat-header-cell *matHeaderCellDef> Id </mat-header-cell>
          <mat-cell *matCellDef="let row"> {{ row.id }} </mat-cell>
        </ng-container>

        <ng-container matColumnDef="nome">
          <mat-header-cell *matHeaderCellDef> Nome </mat-header-cell>
          <mat-cell *matCellDef="let row"> {{ row.nome }} </mat-cell>
        </ng-container>

        <ng-container matColumnDef="actions">
          <mat-header-cell *matHeaderCellDef>Actions</mat-header-cell>
          <mat-cell *matCellDef="let row">
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
          </mat-cell>
        </ng-container>

        <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
        <mat-row *matRowDef="let row; columns: displayedColumns"></mat-row>
      </mat-table>
    </section>
    <section>
      <mat-paginator #paginator [pageSize]="5" [pageSizeOptions]="[5, 10, 25, 100]">
      </mat-paginator>
    </section>
  `,
  styles: ``,
})
export class DepartamentoList {
  departamentoStore = inject(DepartamentoStore);

  @ViewChild(DataSource) dataSource: MatTableDataSource<DepartamentoModel> =
    new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  displayedColumns = ['id', 'nome', 'actions'];

  constructor() {
    effect(() => {
      this.dataSource = new MatTableDataSource(this.departamentoStore.list());
      this.dataSource.paginator = this.paginator;
    });
  }
  onCreate(opcao: string) {
    if (confirm('Deseja realmente criar?')) {
      const ultimoId = this.departamentoStore.list().length + 1;
      const novoData = {
        id: ultimoId.toString(),
        nome: 'Novo' + ultimoId.toString(),
      };
      this.departamentoStore.create({
        ...novoData,
      });
    }
  }

  onUpdateById(data: any) {
    console.log('update', data);
    if (confirm('Deseja realmente alterar?')) {
      const dataUpdate = {...data, nome: 'Alterado Para' + data};
      this.departamentoStore.updateById({
        id: data,
        data: dataUpdate,
      });
    }
  }
  onDeleteById(id: string) {
    if (confirm('Deseja realmente excluir?')) {
      console.log('delete', id);
      this.departamentoStore.deleteById(id);
    }
  }

  applyFilter($event: Event) {
    const filterValue = ($event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
