/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { TErrorResponse } from "../types/TErrorResponse";
import handleValidationError from "../errorHelpers/handlerValidationError";

// global error handler
export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let errorResponse: TErrorResponse = {
    statusCode: err.statusCode || 500,
    status: err.status || "failed",
    message: "Something went wrong",
    issues: err.issues || [],
  };

  if (err instanceof mongoose.Error.ValidationError)
    errorResponse = handleValidationError(err);

  res.status(errorResponse.statusCode).json({
    status: errorResponse.status,
    statusCode: errorResponse.statusCode,
    message: errorResponse.message,
    issues: errorResponse.issues,
    err,
  });
};
