import { NextFunction, Request, Response } from "express";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);
  res
    .status(500)
    .send({ errors: [{ message: err.message || "Something went wrong!" }] });
};
