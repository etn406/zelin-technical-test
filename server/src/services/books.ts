import { dataSource } from "../data-source.js";
import { Book } from "../entities/Book.js";

/**
 * @returns Retrieve all books, except deleted ones.
 */
export async function getBooks(): Promise<Book[]> {
  return (await dataSource.manager.find(Book, {
    where: { deleted: false },
  })) as Required<Book>[];
}

/**
 * Create and insert a new book in the database.
 */
export async function insertNewBook(
  bookProps: Partial<Omit<Book, "id" | "deleted">>
): Promise<Book> {
  const book: Partial<Book> = Object.assign(new Book(), bookProps);
  return (await dataSource.manager.save(book)) as Required<Book>;
}
