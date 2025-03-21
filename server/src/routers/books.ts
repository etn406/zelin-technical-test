import { Router } from "express";
import { getBooks, insertNewBook } from "../services/books.js";

const booksRouter = Router();

booksRouter.get("/", async (req, res) => {
  const books = await getBooks();
  books.push({
    title: "Hello from the Zelin Technical Test server!",
    id: 123,
    deleted: false,
    isbn: "123",
  });
  res.status(200).json(books);
});

booksRouter.post("/", async (req, res) => {
  const newBook = await insertNewBook(req.body);
  res.status(201).json(newBook);
});

export { booksRouter };
