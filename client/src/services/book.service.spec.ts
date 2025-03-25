import { TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { environment } from '../environment';
import { BookService } from './book.service';

describe('BookService', () => {
  let service: BookService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    httpTesting = TestBed.inject(HttpTestingController);
    service = TestBed.inject(BookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get books', () => {
    service
      .getBooks({
        pageIndex: 3,
        pageSize: 15,
        sortColumn: 'note',
        sortDirection: 'asc',
        deleted: true,
      })
      .subscribe((books) => {
        expect(books).toBeTruthy();

        httpTesting.expectOne(
          `${environment.serverURL}/books?pageIndex=3&pageSize=15&sortColumn=note&sortDirection=asc&deleted=true`
        );
      });
  });
});
