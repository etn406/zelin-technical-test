import { Router } from "express";
import { z } from "zod";
import { Book } from "../db/schema.js";
import { GetBooksRequestParamsSchema } from "../entities/get-books-request-params.schema.js";
import { BookInsertSchema } from "../entities/insert-book.schema.js";
import { StrictBookColumnsSchema } from "../entities/strict-book-columns.schema.js";
import { BookUpdateSchema } from "../entities/update-book.schema.js";
import { deleteBook } from "../services/delete-book.js";
import { getBook } from "../services/get-book.js";
import { getBooks } from "../services/get-books.js";
import { insertBook } from "../services/insert-book.js";
import { updateBook } from "../services/update-book.js";

export const booksRouter = Router();

/**
 * Get a paginated list of books
 */
booksRouter.get("/", async (req, res) => {
  const params = GetBooksRequestParamsSchema.parse(req.query);

  const [books, total] = await getBooks(params);

  res.status(200).json({
    books,
    total,
  });
});

/**
 * Gets one specific book
 */
booksRouter.get("/:id", async (req, res) => {
  const id = z.coerce.number().parse(req.params.id);
  const book: Book | null = await getBook(id);

  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404);
  }
});

/**
 * Creates a new book and returns it
 */
booksRouter.post("/", async (req, res) => {
  const data = BookInsertSchema.and(StrictBookColumnsSchema).parse(req.body);
  const book: Book | null = await insertBook(data);

  if (book) {
    res.status(201).json(book);
  } else {
    res.status(500);
  }
});

/**
 * Updates one specific book
 */
booksRouter.put("/:id", async (req, res) => {
  const id = z.coerce.number().parse(req.params.id);
  const data = BookUpdateSchema.and(StrictBookColumnsSchema.partial()).parse(
    req.body
  );
  const book: Book | null = await updateBook(id, data);

  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404);
  }
});

/**
 * Delete one specific book
 */
booksRouter.delete("/:id", async (req, res) => {
  const id = z.coerce.number().parse(req.params.id);
  const book: Book | null = await deleteBook(id);

  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404);
  }
});
