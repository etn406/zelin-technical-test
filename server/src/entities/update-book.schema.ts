import { createUpdateSchema } from "drizzle-zod";
import { booksTable } from "../db/schema.js";

export const BookUpdateSchema = createUpdateSchema(booksTable).omit({
  created_at: true,
  updated_at: true,
});
