/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from "express";

import { TErrorResponse } from "../types/TErrorResponse";

import config from "../config";

import errorPreprocessor from "../helpers/errorHelpers/errorPreprocessor";

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
  });
};
