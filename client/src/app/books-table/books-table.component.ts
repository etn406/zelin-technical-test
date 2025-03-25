import {
  AfterViewInit,
  Component,
  computed,
  inject,
  input,
  output,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { merge, startWith } from 'rxjs';
import {
  BOOK_TABLE_DEFAULT_DISPLAYED_COLUMNS,
  BOOK_TABLE_DEFAULT_DISPLAYED_COLUMNS_FOR_HANDSET,
} from '../../consts';
import { Book } from '../../entities/book.schema';
import { GetBooksParams } from '../../entities/get-books-params.interface';
import { BookService } from '../../services/book.service';
import { getHandsetSignal } from '../../utils/get-handset-signal';
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
    MatTooltipModule,
  ],
})
export class BooksTableComponent implements AfterViewInit {
  private readonly alertService = inject(AlertService);
  private readonly bookService = inject(BookService);

  readonly books = input.required<Book[]>();
  readonly booksTotal = input.required();

  readonly isHandset = getHandsetSignal();

  /**
   * Makes certain columns editable
   */
  readonly editable = input(true);

  /**
   * Parameters that can be modified to request the books
   */
  readonly parameters = input.required<GetBooksParams>();
  readonly parametersChange = output<GetBooksParams>();

  readonly sortColumn = computed(() => this.parameters().sortColumn);
  readonly sortDirection = computed(() => this.parameters().sortDirection);

  readonly displayedColumns = computed(() =>
    this.isHandset()
      ? BOOK_TABLE_DEFAULT_DISPLAYED_COLUMNS_FOR_HANDSET
      : BOOK_TABLE_DEFAULT_DISPLAYED_COLUMNS
  );

  @ViewChild(MatPaginator) matPaginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;

  ngAfterViewInit(): void {
    this.matSort.sortChange.subscribe(() => {
      this.matPaginator.pageIndex = 0;
    });

    merge(this.matSort.sortChange, this.matPaginator.page)
      .pipe(startWith({}))
      .subscribe(() => this.parametersChange.emit(this.getBooksParams()));
  }

  /**
   * Triggers the update of the book with the new rating
   */
  public onRatingChange(bookId: number, value: number): void {
    this.bookService.updateBook(bookId, { note: value }).subscribe({
      next: (book) => {
        this.alertService.info(`Book rating updated successfully!`);
      },
      error: (error) => {
        this.alertService.error(
          `An error occurred when updating the book!`,
          `${error.message}`
        );
      },
    });
  }

  /**
   * Creates a object of params from the component to request books
   */
  private getBooksParams(): GetBooksParams {
    const pageIndex = this.matPaginator.pageIndex;
    const pageSize = this.matPaginator.pageSize;
    const sortColumn = this.matSort.active;
    const sortDirection = this.matSort.direction || 'asc';

    console.log(this.parameters(), {
      pageIndex,
      pageSize,
      sortColumn,
      sortDirection,
    });

    return {
      ...this.parameters(),
      pageIndex,
      pageSize,
      sortColumn,
      sortDirection,
    };
  }
}
