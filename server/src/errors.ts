import { ErrorRequestHandler } from "express";

export const errorRequestHandler = ((err, req, res, next) => {
  res.status(err?.status ?? 500).json({
    message: err?.message,
    errors: err?.errors,
  });
}) as ErrorRequestHandler;
