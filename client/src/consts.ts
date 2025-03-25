export const BOOK_TABLE_DEFAULT_PAGE_SIZE = 10;
export const BOOK_TABLE_DEFAULT_SORT_COLUMN = 'created_at';
export const BOOK_TABLE_DEFAULT_SORT_DIRECTION: 'asc' | 'desc' = 'desc';

export const BOOK_TABLE_DEFAULT_DISPLAYED_COLUMNS = [
  'created_at',
  'title',
  'author_name',
  'note',
  'actions',
];

export const BOOK_TABLE_DEFAULT_DISPLAYED_COLUMNS_FOR_HANDSET = [
  'title',
  'author_name',
  'actions',
];

export const ISBN_REGEXP = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/;
