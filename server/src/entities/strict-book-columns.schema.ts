import { z } from "zod";

export const StrictBookColumnsSchema = z.object({
  title: z.string().min(1).max(255),
  author_name: z.string().min(1).max(255),
  note: z.coerce.number().min(0).max(10),
  isbn: z.string().min(1).max(20),
});
