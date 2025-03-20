import express from "express";
import "reflect-metadata";
import { initializeDataSource } from "./data-source.js";
import { SERVER_PORT } from "./env.js";
import { homeRouter as booksRouter } from "./routers/books.js";
import { statusRouter } from "./routers/status.js";

await initializeDataSource();

const app = express();

app.use("/books", booksRouter);
app.use("/status", statusRouter);

app.listen(SERVER_PORT, () => {
  console.log(`App is listening on port ${SERVER_PORT}`);
});
