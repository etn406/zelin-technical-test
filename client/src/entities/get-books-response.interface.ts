import { Book } from './book.interface';

export interface GetBooksResponse {
  books: Book[];
  total: number;
}
