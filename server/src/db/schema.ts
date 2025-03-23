import {
  boolean,
  integer,
  pgTable,
  smallint,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const booksTable = pgTable("books", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  isbn: varchar({ length: 255 }),
  title: varchar({ length: 255 }).notNull(),
  note: smallint(),
  author_name: varchar({ length: 255 }).notNull(),
  deleted: boolean().default(false),
  created_at: timestamp().defaultNow().notNull(),
  updated_at: timestamp(),
});

export type Book = typeof booksTable.$inferSelect;
