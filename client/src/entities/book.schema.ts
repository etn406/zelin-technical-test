import { z } from 'zod';

export const BookSchema = z.object({
  id: z.number(),
  isbn: z.string(),
  title: z.string(),
  note: z.number(),
  author_name: z.string(),
  deleted: z.boolean(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export type Book = z.infer<typeof BookSchema>;
