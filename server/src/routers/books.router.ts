import { Router } from "express";
import { z } from "zod";
import { GetBooksRequestParamsSchema } from "../entities/get-books-request-params.schema.js";
import { getBooks } from "../services/books.service.js";

export const booksRouter = Router();

booksRouter.get("/", async (req, res) => {
  const params: z.infer<typeof GetBooksRequestParamsSchema> =
    GetBooksRequestParamsSchema.parse(req.query);

  const [books, total] = await getBooks(
    params.pageIndex,
    params.pageSize,
    params.sortColumn,
    params.sortDirection
  );

  res.status(200).json({
    books,
    total,
  });
});
