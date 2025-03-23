import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import {
  catchError,
  map,
  merge,
  of as observableOf,
  startWith,
  switchMap,
} from 'rxjs';
import {
  BOOK_TABLE_DEFAULT_DISPLAYED_COLUMNS,
  BOOK_TABLE_DEFAULT_PAGE_SIZE,
  BOOK_TABLE_DEFAULT_SORT_COLUMN,
  BOOK_TABLE_DEFAULT_SORT_DIRECTION,
} from '../../consts';
import { GetBooksResponse } from '../../entities/get-books-response.interface';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-books-table',
  templateUrl: './books-table.component.html',
  styleUrl: './books-table.component.scss',
  imports: [MatTableModule, MatPaginatorModule, MatSortModule],
})
export class BooksTableComponent implements AfterViewInit {
  private bookService = inject(BookService);
  public data: GetBooksResponse = { books: [], total: 0 };

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public isLoadingResults = false;
  public displayedColumns = BOOK_TABLE_DEFAULT_DISPLAYED_COLUMNS;

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.bookService
            .getBooks(
              this.paginator?.pageIndex ?? 0,
              this.paginator?.pageSize ?? BOOK_TABLE_DEFAULT_PAGE_SIZE,
              this.sort?.active ?? BOOK_TABLE_DEFAULT_SORT_COLUMN,
              this.sort?.direction ?? BOOK_TABLE_DEFAULT_SORT_DIRECTION
            )
            .pipe(catchError(() => observableOf(null)));
        }),
        map((data): GetBooksResponse => {
          this.isLoadingResults = false;

          if (!data) {
            return { books: [], total: 0 };
          }

          return data;
        })
      )
      .subscribe((data) => {
        this.data = data;
      });
  }
}
