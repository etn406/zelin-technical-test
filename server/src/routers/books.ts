import { Router } from "express";
import { NODE_ENV } from "../env.js";

const booksRouter = Router();

booksRouter.get("/", (req, res) => {
  res.status(200).json({
    text: "Hello from the Zelin Technical Test server!",
    env: NODE_ENV,
  });

  console.log("Hello from the Zelin Technical Test server!");
});

export { booksRouter as homeRouter };
