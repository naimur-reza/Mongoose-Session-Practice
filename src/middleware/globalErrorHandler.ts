/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from "express";
import mongoose, { mongo } from "mongoose";
import { TErrorResponse } from "../types/TErrorResponse";
import handleValidationError from "../errorHelpers/handlerValidationError";
import handleDuplicateError from "../errorHelpers/handleDuplicateError";
import handleCastError from "../errorHelpers/handleCastError";
import config from "../config";
import handleGenericError from "../errorHelpers/handleGenericError";
import GenericError from "../errorClasses/GenericError";
import errorPreprocessor from "../errorHelpers/errorPreprocessor";

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

  errorResponse = errorPreprocessor(err);

  res.status(errorResponse.statusCode).json({
    status: errorResponse.status,
    statusCode: errorResponse.statusCode,
    message: errorResponse.message,
    issues: errorResponse.issues,
    stack: config.node_env === "development" ? err.stack : null,
    err,
  });
};
