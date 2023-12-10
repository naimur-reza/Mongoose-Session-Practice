/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import { TErrorIssue, TErrorResponse } from "../../types/TErrorResponse";

const handleValidationError = (
  err: mongoose.Error.ValidationError,
): TErrorResponse => {
  const issues: TErrorIssue = [];
  const errorValues = Object.values(err.errors);

  errorValues.forEach(errObj => {
    issues.push({
      path: errObj.path,
      message: errObj.message,
    });
  });

  return {
    status: "failed",
    statusCode: 400,
    message: "Validation failed",
    issues: errorValues,
  };
};

export default handleValidationError;
