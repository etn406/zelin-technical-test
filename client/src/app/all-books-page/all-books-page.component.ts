import { Component, inject, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {
  BOOK_TABLE_DEFAULT_PAGE_SIZE,
  BOOK_TABLE_DEFAULT_SORT_COLUMN,
  BOOK_TABLE_DEFAULT_SORT_DIRECTION,
} from '../../consts';
import { Book } from '../../entities/book.schema';
import { GetBooksParams } from '../../entities/get-books-params.interface';
import { BookService } from '../../services/book.service';
import { AlertService } from '../alert.service';
import { BooksTableComponent } from '../books-table/books-table.component';

@Component({
  selector: 'app-all-books-page',
  imports: [BooksTableComponent, MatCardModule],
  templateUrl: './all-books-page.component.html',
  styleUrl: './all-books-page.component.scss',
})
export class AllBooksPageComponent {
  private readonly alertService = inject(AlertService);
  private readonly bookService = inject(BookService);

  readonly isLoadingResults = signal(false);

  readonly books = signal<Book[]>([]);
  readonly booksTotal = signal(0);

  readonly parameters = signal<GetBooksParams>({
    pageIndex: 0,
    pageSize: BOOK_TABLE_DEFAULT_PAGE_SIZE,
    sortColumn: BOOK_TABLE_DEFAULT_SORT_COLUMN,
    sortDirection: BOOK_TABLE_DEFAULT_SORT_DIRECTION,
    deleted: false,
  });

  onParametersChange(parameters: GetBooksParams): void {
    console.log(this.parameters());
    this.parameters.set(parameters);
    this.requestBooks();
  }

  private requestBooks(): void {
    this.isLoadingResults.set(true);

    this.bookService.getBooks(this.parameters()).subscribe({
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
}
