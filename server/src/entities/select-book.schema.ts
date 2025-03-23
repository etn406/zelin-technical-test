import { createSelectSchema } from "drizzle-zod";
import { booksTable } from "../db/schema.js";

export const BookSelectSchema = createSelectSchema(booksTable);
