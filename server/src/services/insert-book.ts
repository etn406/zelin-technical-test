import { z } from "zod";
import { db } from "../db/index.js";
import { Book, booksTable } from "../db/schema.js";
import { BookInsertSchema } from "../entities/insert-book.schema.js";

export async function insertBook(
  bookData: z.infer<typeof BookInsertSchema>
): Promise<Book | null> {
  const created_at = new Date();

  const book = await db
    .insert(booksTable)
    .values({ ...bookData, created_at })
    .returning();

  return book[0] ?? null;
}
