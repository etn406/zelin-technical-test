import {
  AfterViewInit,
  Component,
  inject,
  isDevMode,
  ViewChild,
} from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { catchError, map, merge, of, startWith, switchMap } from 'rxjs';
import {
  BOOK_TABLE_DEFAULT_DISPLAYED_COLUMNS,
  BOOK_TABLE_DEFAULT_PAGE_SIZE,
  BOOK_TABLE_DEFAULT_SORT_COLUMN,
  BOOK_TABLE_DEFAULT_SORT_DIRECTION,
} from '../../consts';
import { GetBooksParams } from '../../entities/get-books-params.interface';
import { GetBooksResponse } from '../../entities/get-books-response.interface';
import { BookService } from '../../services/book.service';
import { StarRatingComponent } from '../star-rating/star-rating.component';

@Component({
  selector: 'app-books-table',
  templateUrl: './books-table.component.html',
  styleUrl: './books-table.component.scss',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    StarRatingComponent,
  ],
})
export class BooksTableComponent implements AfterViewInit {
  private snackBar = inject(MatSnackBar);
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
          return this.bookService.getBooks(this.getBooksParams());
        }),
        catchError((error) => {
          console.error(error);

          if (error.name === 'HttpErrorResponse') {
            this.showErrorSnackbar(
              `An error occurred when requesting the books, the server may be not reacheable!`,
              isDevMode() ? `${error.message}` : ''
            );
          } else if (error.name === 'ZodError') {
            this.showErrorSnackbar(
              `An error occurred when parsing the response!`,
              isDevMode() ? `${error.message}` : ''
            );
          }

          return of({ books: [], total: 0 });
        }),
        map((data): GetBooksResponse => {
          this.isLoadingResults = false;
          return data;
        })
      )
      .subscribe((data) => {
        this.data = data;
      });
  }

  private getBooksParams(): GetBooksParams {
    return {
      pageIndex: this.paginator?.pageIndex ?? 0,
      pageSize: this.paginator?.pageSize ?? BOOK_TABLE_DEFAULT_PAGE_SIZE,
      sortColumn: this.sort?.active ?? BOOK_TABLE_DEFAULT_SORT_COLUMN,
      sortDirection: this.sort?.direction || BOOK_TABLE_DEFAULT_SORT_DIRECTION,
    };
  }

  private showErrorSnackbar(...messages: string[]): void {
    this.snackBar.open(messages.join('\n'), 'OK');
  }
}
