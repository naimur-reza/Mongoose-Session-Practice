/* eslint-disable @typescript-eslint/no-explicit-any */

import { TErrorIssue, TErrorResponse } from "../types/TErrorResponse";
import { ZodError } from "zod";
const handleZodError = (err: ZodError): TErrorResponse => {
  const issues: TErrorIssue = err.issues.map(error => ({
    path: error.path[error.path.length - 1],
    message: error.message,
  }));
  return {
    status: "error",
    statusCode: 400,
    message: "Validation error",
    issues,
  };
};

export default handleZodError;
