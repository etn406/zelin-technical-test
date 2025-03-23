import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { SortDirection } from '@angular/material/sort';
import { map, Observable } from 'rxjs';
import { Book } from '../entities/book.interface';
import { GetBooksResponseSchema } from '../entities/get-books-response.schema';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  protected httpClient = inject(HttpClient);

  public getBooks(
    pageIndex: number,
    pageSize: number,
    sortColumn: string,
    sortDirection: SortDirection
  ): Observable<{ books: Book[]; total: number }> {
    return this.httpClient
      .get(this.getBooksURL(pageIndex, pageSize, sortColumn, sortDirection))
      .pipe(map((res: Object) => GetBooksResponseSchema.parse(res)));
  }

  private getBooksURL(
    pageIndex: number,
    pageSize: number,
    sortColumn: string,
    sortDirection: SortDirection
  ): string {
    const url = new URL('books', environment.serverURL);

    url.searchParams.set('pageIndex', pageIndex.toString());
    url.searchParams.set('pageSize', pageSize.toString());
    url.searchParams.set('sortColumn', sortColumn);
    url.searchParams.set('sortDirection', sortDirection);

    return url.toString();
  }
}
