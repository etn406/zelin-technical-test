import express, { Request, Response } from "express";
import "reflect-metadata";
import { initializeDataSource } from "./data-source.js";
import { SERVER_PORT } from "./env.js";
await initializeDataSource();

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    text: "Hello from the Zelin Technical Test server!",
    env: NODE_ENV,
  });
  console.log("Hello from the Zelin Technical Test server!");
});

app.listen(SERVER_PORT, () => {
  console.log(`App is listening on port ${SERVER_PORT}`);
});
