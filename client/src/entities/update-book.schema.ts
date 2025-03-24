import { Book } from './book.schema';

export type UpdateBookSchema = Omit<
  Partial<Book>,
  'id' | 'created_at' | 'updated_at'
>;
