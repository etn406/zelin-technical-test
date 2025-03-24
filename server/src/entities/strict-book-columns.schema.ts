import { z } from "zod";

export const StrictBookColumnsSchema = z.object({
  title: z.string().nonempty().max(255),
  author_name: z.string().nonempty().max(255),
  note: z.coerce.number().min(0).max(10),
  isbn: z.string().max(20),
});
