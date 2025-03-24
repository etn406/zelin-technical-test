import { eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { Book, booksTable } from "../db/schema.js";

/**
 * Delete **definitely** a book (regardless of its 'deleted' field).
 */
export async function deleteBook(id: number): Promise<Book> {
  const book = await db
    .delete(booksTable)
    .where(eq(booksTable.id, id))
    .returning();

  return book[0] ?? null;
}
