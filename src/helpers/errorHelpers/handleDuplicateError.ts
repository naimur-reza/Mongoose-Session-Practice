/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import { TErrorIssue, TErrorResponse } from "../../types/TErrorResponse";

const handleDuplicateError = (
  err: mongoose.Error.ValidationError,
): TErrorResponse => {
  const regex = /"(.*?)"/;
  const matches = err.message.match(regex);
  const issues: TErrorIssue = [
    {
      path: "",
      message: `Duplicate key error, ${matches![1]}`,
    },
  ];
  return {
    status: "error",
    statusCode: 409,
    message: "Duplicate error",
    issues,
  };
};

export default handleDuplicateError;
