/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import { TErrorIssue, TErrorResponse } from "../types/TErrorResponse";

const handleCastError = (err: mongoose.Error.CastError): TErrorResponse => {
  const issues: TErrorIssue = [
    {
      path: err.path,
      message: err.message,
    },
  ];
  return {
    status: "error",
    statusCode: 400,
    message: "Cast error",
    issues,
  };
};

export default handleCastError;
