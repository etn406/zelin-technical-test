import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "../db/index.js";
import { Book, booksTable } from "../db/schema.js";
import { BookUpdateSchema } from "../entities/update-book.schema.js";

export async function updateBook(
  id: number,
  partialBook: z.infer<typeof BookUpdateSchema>
): Promise<Book | null> {
  const updated_at = new Date();

  const book = await db
    .update(booksTable)
    .set({ ...partialBook, updated_at })
    .where(eq(booksTable.id, id))
    .returning();

  return book[0] ?? null;
}
