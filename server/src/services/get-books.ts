import { asc, desc, eq } from "drizzle-orm";
import type { z } from "zod";
import { db } from "../db/index.js";
import { Book, booksTable } from "../db/schema.js";
import { BookColumnSchema } from "../entities/book-column.schema.js";
import type { SortDirectionSchema } from "../entities/sort-direction.schema.js";

/**
 * @returns Retrieve all books, except deleted ones.
 */
export async function getBooks(
  pageIndex: number,
  pageSize: number,
  sortColumn: z.infer<typeof BookColumnSchema>,
  sortDirection: z.infer<typeof SortDirectionSchema>
): Promise<[Book[], number]> {
  const total = await db.$count(booksTable, eq(booksTable.deleted, false));

  const books = await db
    .select()
    .from(booksTable)
    .where(eq(booksTable.deleted, false))
    .orderBy(
      sortDirection === "asc"
        ? asc(booksTable[sortColumn])
        : desc(booksTable[sortColumn])
    )
    .limit(pageSize)
    .offset(pageIndex * pageSize);

  return [books, total];
}
