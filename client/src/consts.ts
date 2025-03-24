import { Book } from './entities/book.schema';

export const BOOK_TABLE_DEFAULT_PAGE_SIZE = 10;
export const BOOK_TABLE_DEFAULT_SORT_COLUMN: keyof Book = 'created_at';
export const BOOK_TABLE_DEFAULT_SORT_DIRECTION: 'asc' | 'desc' = 'desc';

export const BOOK_TABLE_DEFAULT_DISPLAYED_COLUMNS = [
  'title',
  'author_name',
  'note',
] as (keyof Book)[];
