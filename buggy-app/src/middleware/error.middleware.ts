import { NextFunction, Request, Response } from "express";
import logger from "../logger.js";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  logger.error(
    {
    method: req.method,
    url: req.originalUrl,
    errorName: err.name,
    stack: err.stack,
    },
    err.message
  );

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
};