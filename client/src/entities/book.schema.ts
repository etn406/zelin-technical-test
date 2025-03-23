import { z } from 'zod';

export const BookSchema = z.object({
  id: z.number(),
  isbn: z.string(),
  title: z.string(),
  author: z.string(),
  deleted: z.boolean(),
  dateAdded: z.string().datetime(),
});
