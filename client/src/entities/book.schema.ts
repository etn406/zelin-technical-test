import { z } from 'zod';

export const BookSchema = z.object({
  id: z.coerce.number(),
  isbn: z.string().nullable(),
  title: z.string(),
  note: z.number().nullable(),
  author_name: z.string(),
  deleted: z.boolean(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
});

export type Book = z.infer<typeof BookSchema>;
