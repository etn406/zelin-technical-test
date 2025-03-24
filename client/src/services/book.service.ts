import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Book, BookSchema } from '../entities/book.schema';
import { GetBooksParams } from '../entities/get-books-params.interface';
import { GetBooksResponse } from '../entities/get-books-response.interface';
import { GetBooksResponseSchema } from '../entities/get-books-response.schema';
import { UpdateBookSchema } from '../entities/update-book.schema';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  protected httpClient = inject(HttpClient);

  public getBooks(params: GetBooksParams): Observable<GetBooksResponse> {
    const url = new URL('books', environment.serverURL);

    url.searchParams.set('pageIndex', params.pageIndex.toString());
    url.searchParams.set('pageSize', params.pageSize.toString());
    url.searchParams.set('sortColumn', params.sortColumn);
    url.searchParams.set('sortDirection', params.sortDirection);

    return this.httpClient
      .get(url.toString())
      .pipe(map((res: Object) => GetBooksResponseSchema.parse(res)));
  }

  private createGetBooksURL(params: GetBooksParams): URL {
    const url = new URL('books', environment.serverURL);

    url.searchParams.set('pageIndex', params.pageIndex.toString());
    url.searchParams.set('pageSize', params.pageSize.toString());
    url.searchParams.set('sortColumn', params.sortColumn);
    url.searchParams.set('sortDirection', params.sortDirection);

    return url;
  }

  /**
   * Get a single book
   */
  public getBook(id: number): Observable<Book> {
    const url = new URL(`books/${id}`, environment.serverURL);
    return this.httpClient
      .get(url.toString())
      .pipe(map((res: Object) => BookSchema.parse(res)));
  }

  /**
   * Updates a book and returns it
   */
  public updateBook(id: number, book: UpdateBookSchema): Observable<Book> {
    const url = new URL(`books/${id}`, environment.serverURL);

    return this.httpClient
      .put(url.toString(), book)
      .pipe(map((res: Object) => BookSchema.parse(res)));
  }

  /**
   * Mark a book as deleted.
   */
  public markBookAsDeleted(id: number): Observable<Book> {
    return this.updateBook(id, { deleted: true });
  }

  /**
   * Restore a book previously marked as deleted.
   */
  public restoreDeletedBook(id: number): Observable<Book> {
    return this.updateBook(id, { deleted: false });
  }

  /**
   * Definitely delete a book
   */
  public definitelyDeleteBook(id: number): Observable<null> {
    const url = new URL(`books/${id}`, environment.serverURL);

    return this.httpClient
      .delete(url.toString())
      .pipe(map((res: Object) => null));
  }
}
