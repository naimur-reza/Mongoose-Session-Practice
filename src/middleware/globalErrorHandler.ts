/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from "express";
import mongoose, { mongo } from "mongoose";
import { TErrorResponse } from "../types/TErrorResponse";
import handleValidationError from "../errorHelpers/handlerValidationError";
import handleDuplicateError from "../errorHelpers/handleDuplicateError";
import handleCastError from "../errorHelpers/handleCastError";

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
  else if (err.code && err.code === 11000)
    errorResponse = handleDuplicateError(err);
  else if (err instanceof mongoose.Error.CastError)
    errorResponse = handleCastError(err);

  res.status(errorResponse.statusCode).json({
    status: errorResponse.status,
    statusCode: errorResponse.statusCode,
    message: errorResponse.message,
    issues: errorResponse.issues,
    err,
  });
};
