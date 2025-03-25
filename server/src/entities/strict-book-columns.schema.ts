import { z } from "zod";
import { ISBN_REGEXP } from "../consts.js";

export const StrictBookColumnsSchema = z.object({
  title: z.string().nonempty().max(255),
  author_name: z.string().nonempty().max(255),
  note: z.coerce.number().int().min(0).max(10),
  isbn: z.string().regex(ISBN_REGEXP),
});
