import cors from "cors";
import express from "express";
import "reflect-metadata";
import { CLIENT_URL, SERVER_PORT } from "./env.js";
import { errorRequestHandler } from "./errors.js";
import { booksRouter } from "./routers/books.router.js";

const app = express();

app.use(errorRequestHandler);

// Allows the client to have a different hostname/port than the server
app.use(
  cors({
    origin: CLIENT_URL,
  })
);

// Parse JSON body (for PUT/POST requests)
app.use(express.json());

// Routes need to be registered after the middlewares
app.use("/books", booksRouter);

app.listen(SERVER_PORT, () => {
  console.log(`App is listening on port ${SERVER_PORT}`);
});
