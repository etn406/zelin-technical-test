import { z } from "zod";
import { BookColumnSchema } from "./book-column.schema.js";
import { SortDirectionSchema } from "./sort-direction.schema.js";

export const GetBooksRequestParamsSchema = z.object({
  pageIndex: z.coerce.number(),
  pageSize: z.coerce.number(),
  sortColumn: BookColumnSchema,
  sortDirection: SortDirectionSchema,
});
