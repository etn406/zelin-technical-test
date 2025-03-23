import cors from "cors";
import express from "express";
import "reflect-metadata";
import { CLIENT_URL, SERVER_PORT } from "./env.js";
import { errorRequestHandler } from "./errors.js";
import { booksRouter } from "./routers/books.router.js";
import { statusRouter } from "./routers/status.router.js";

const app = express();

app.use(errorRequestHandler);

app.use(
  cors({
    origin: CLIENT_URL,
  })
);

app.use("/books", booksRouter);
app.use("/status", statusRouter);

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: false }));

app.listen(SERVER_PORT, () => {
  console.log(`App is listening on port ${SERVER_PORT}`);
});
