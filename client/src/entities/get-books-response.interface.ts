import { Book } from './book.schema';

export interface GetBooksResponse {
  books: Book[];
  total: number;
}
