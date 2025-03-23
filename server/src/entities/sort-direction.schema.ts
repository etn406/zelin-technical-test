import { z } from "zod";

export type SortDirection = "asc" | "desc";

export const SortDirectionSchema = z.enum(["asc", "desc"]);
