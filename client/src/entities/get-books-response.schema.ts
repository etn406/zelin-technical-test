import { z } from 'zod';
import { BookSchema } from './book.schema';

export const GetBooksResponseSchema = z.object({
  books: z.array(BookSchema),
  total: z.number().int().nonnegative(),
});
