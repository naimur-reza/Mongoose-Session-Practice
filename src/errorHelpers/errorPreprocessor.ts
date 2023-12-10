/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import GenericError from "../errorClasses/GenericError";
import handleCastError from "./handleCastError";
import handleDuplicateError from "./handleDuplicateError";
import handleGenericError from "./handleGenericError";
import handleValidationError from "./handlerValidationError";
import { ZodError } from "zod";
import handleZodError from "./handleZodError";

const errorPreprocessor = (err: any) => {
  if (err instanceof ZodError) {
    return handleZodError(err);
  } else if (err instanceof mongoose.Error.ValidationError)
    return handleValidationError(err);
  else if (err.code && err.code === 11000) return handleDuplicateError(err);
  else if (err instanceof mongoose.Error.CastError) return handleCastError(err);
  else if (err instanceof GenericError) return handleGenericError(err);
  else {
    return {
      statusCode: 400,
      message: "Unknown error",
      status: "error",
      issues: [
        {
          path: "",
          message: err.message,
        },
      ],
    };
  }
};

export default errorPreprocessor;
