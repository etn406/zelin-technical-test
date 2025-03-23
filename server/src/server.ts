import express from "express";
import * as OpenApiValidator from "express-openapi-validator";
import "reflect-metadata";
import { initializeDataSource } from "./data-source.js";
import { SERVER_PORT } from "./env.js";
import { errorRequestHandler } from "./errors.js";
import { booksRouter } from "./routers/books.js";
import { statusRouter } from "./routers/status.js";

await initializeDataSource();

const app = express();

app.use(errorRequestHandler);

app.use("/books", booksRouter);
app.use("/status", statusRouter);

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: false }));

app.listen(SERVER_PORT, () => {
  console.log(`App is listening on port ${SERVER_PORT}`);
});
