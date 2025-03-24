import { Book } from './book.schema';

export type InsertOrUpdateBookData = Omit<
  Partial<Book>,
  'id' | 'created_at' | 'updated_at'
>;
