import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { OrderNotFoundError } from "./orderNotFoundError";
import { BookValidationError } from "./bookValidationError";
import { AppError } from "./appError";
import httpStatus from "http-status";

export const errorHandler: ErrorRequestHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof OrderNotFoundError) {
    return buildErrorResponse(
      httpStatus.NOT_FOUND,
      httpStatus["404_NAME"],
      error.message,
      res
    );
  }
  if (error instanceof BookValidationError) {
    return buildErrorResponse(
      httpStatus.BAD_REQUEST,
      httpStatus["400_NAME"],
      error.message,
      res
    );
  }
  return buildErrorResponse(
    httpStatus.INTERNAL_SERVER_ERROR,
    httpStatus["500_NAME"],
    error.message,
    res
  );
};

const buildErrorResponse = (
  statusCode: number,
  status: string,
  message: string,
  res: Response
) => {
  return res.status(statusCode).send(new AppError(status, statusCode, message));
};
