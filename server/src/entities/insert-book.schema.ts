import { createInsertSchema } from "drizzle-zod";
import { booksTable } from "../db/schema.js";

export const BookInsertSchema = createInsertSchema(booksTable).omit({
  created_at: true,
  updated_at: true,
});
