import { Request, Response, NextFunction } from "express";
import { getUser } from "../services/user.service.js";

export const getUserController = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const user = getUser();

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};