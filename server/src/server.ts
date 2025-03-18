import express, { Request, Response } from "express";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.status(200).json("Hello from the Zelin Technical Test server");
});

app.listen(4000, () => {
  console.log(`App is listening on port 4000`);
});
