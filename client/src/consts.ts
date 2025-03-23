import { SortDirection } from '@angular/material/sort';
import { Book } from './entities/book.schema';

export const BOOK_TABLE_DEFAULT_PAGE_SIZE = 10;
export const BOOK_TABLE_DEFAULT_SORT_COLUMN: keyof Book = 'created_at';
export const BOOK_TABLE_DEFAULT_SORT_DIRECTION: SortDirection = 'desc';

export const BOOK_TABLE_DEFAULT_DISPLAYED_COLUMNS = [
  'title',
  'author',
] as (keyof Book)[];
