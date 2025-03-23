import { Book } from './entities/book.interface';

export const BOOK_TABLE_DEFAULT_PAGE_SIZE = 10;
export const BOOK_TABLE_DEFAULT_SORT_COLUMN = 'dateAdded';
export const BOOK_TABLE_DEFAULT_SORT_DIRECTION = 'desc';

export const BOOK_TABLE_DEFAULT_DISPLAYED_COLUMNS = [
  'title',
  'author',
] as (keyof Book)[];
