import { z } from "zod";
import { Book } from "../db/schema.js";

export const BookColumnSchema = z.enum([
  "id",
  "isbn",
  "title",
  "note",
  "author_name",
  "deleted",
  "created_at",
  "updated_at",
] as [keyof Book, ...(keyof Book)[]]);
