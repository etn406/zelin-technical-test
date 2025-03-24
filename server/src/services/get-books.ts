import { and, asc, desc, eq, like, sql, SQL } from "drizzle-orm";
import type { z } from "zod";
import { db } from "../db/index.js";
import { Book, booksTable } from "../db/schema.js";
import { GetBooksRequestParamsSchema } from "../entities/get-books-request-params.schema.js";

/**
 * @returns Retrieve all books, except deleted ones.
 */
export async function getBooks(
  params: z.infer<typeof GetBooksRequestParamsSchema>
): Promise<[Book[], number]> {
  const { pageSize, pageIndex, sortColumn, sortDirection } = params;

  const conditions = createSQLConditionsFromGETParams(params);
  const total = await db.$count(booksTable, and(...conditions));

  const books = await db
    .select()
    .from(booksTable)
    .where(and(...conditions))
    .orderBy(
      sortDirection === "asc"
        ? asc(booksTable[sortColumn])
        : desc(booksTable[sortColumn])
    )
    .limit(pageSize)
    .offset(pageIndex * pageSize);

  return [books, total];
}

function createSQLConditionsFromGETParams(
  params: z.infer<typeof GetBooksRequestParamsSchema>
): SQL<unknown>[] {
  const conditions: SQL<unknown>[] = [];

  if (params.query !== undefined) {
    conditions.push(like(booksTable.title, `%${params.query}%`));
  }

  if (params.noteAbove !== undefined) {
    conditions.push(sql`${booksTable.note} > ${params.noteAbove}`);
  }

  if (params.noteBelow !== undefined) {
    conditions.push(sql`${booksTable.note} < ${params.noteBelow}`);
  }

  if (params.deleted !== undefined) {
    conditions.push(eq(booksTable.deleted, params.deleted));
  }

  return conditions;
}
