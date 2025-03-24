import { eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { Book, booksTable } from "../db/schema.js";

/**
 * Retrieve a book by its id.
 */
export async function getBook(id: number): Promise<Book | null> {
  const book = await db
    .select()
    .from(booksTable)
    .where(eq(booksTable.id, id))
    .limit(1);

  return book[0] ?? null;
}
