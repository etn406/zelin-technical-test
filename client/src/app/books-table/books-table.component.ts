import {
  AfterViewInit,
  Component,
  inject,
  signal,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { merge, startWith, switchMap } from 'rxjs';
import {
  BOOK_TABLE_DEFAULT_DISPLAYED_COLUMNS,
  BOOK_TABLE_DEFAULT_PAGE_SIZE,
  BOOK_TABLE_DEFAULT_SORT_COLUMN,
  BOOK_TABLE_DEFAULT_SORT_DIRECTION,
} from '../../consts';
import { Book } from '../../entities/book.schema';
import { GetBooksParams } from '../../entities/get-books-params.interface';
import { BookService } from '../../services/book.service';
import { AlertService } from '../alert.service';
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
    MatIconModule,
    MatButtonModule,
    RouterLink,
  ],
})
export class BooksTableComponent implements AfterViewInit {
  private readonly alertService = inject(AlertService);
  private readonly bookService = inject(BookService);

  readonly books = signal<Book[]>([]);
  readonly booksTotal = signal(0);
  readonly isLoadingResults = signal(false);
  readonly displayedColumns = signal<(keyof Book)[]>(
    BOOK_TABLE_DEFAULT_DISPLAYED_COLUMNS
  );

  @ViewChild(MatPaginator) matPaginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;

  ngAfterViewInit(): void {
    this.matSort.sortChange.subscribe(() => (this.matPaginator.pageIndex = 0));

    merge(this.matSort.sortChange, this.matPaginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults.set(true);
          return this.bookService.getBooks(this.getBooksParams());
        })
      )
      .subscribe({
        next: (data) => {
          this.isLoadingResults.set(false);
          this.books.set(data.books);
          this.booksTotal.set(data.total);
        },
        error: (error) => {
          if (error.name === 'HttpErrorResponse') {
            this.alertService.error(
              `An error occurred when requesting the books, the server may be not reacheable!`,
              `${error.message}`
            );
          } else if (error.name === 'ZodError') {
            this.alertService.error(
              `An error occurred when parsing the response!`,
              `${error.message}`
            );
          }
        },
      });
  }

  private getBooksParams(): GetBooksParams {
    return {
      pageIndex: this.matPaginator?.pageIndex ?? 0,
      pageSize: this.matPaginator?.pageSize ?? BOOK_TABLE_DEFAULT_PAGE_SIZE,
      sortColumn: this.matSort?.active ?? BOOK_TABLE_DEFAULT_SORT_COLUMN,
      sortDirection:
        this.matSort?.direction || BOOK_TABLE_DEFAULT_SORT_DIRECTION,

      deleted: false,
    };
  }
}
