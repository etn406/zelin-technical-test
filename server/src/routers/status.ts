import { Router } from "express";

const statusRouter = Router();

statusRouter.get("/", (req, res) => {
  res.status(200).json({
    text: "Hello from the Zelin Technical Test server!",
  });

  console.log("Hello from the Zelin Technical Test server!");
});

export { statusRouter };
