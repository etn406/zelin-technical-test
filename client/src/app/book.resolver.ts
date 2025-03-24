import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Book, BookSchema } from '../entities/book.schema';
import { BookService } from '../services/book.service';

export const bookResolver: ResolveFn<Book> = (route, state) => {
  const bookService = inject(BookService);
  const id = BookSchema.shape.id.parse(route.paramMap.get('id'));

  return bookService.getBook(id);
};
