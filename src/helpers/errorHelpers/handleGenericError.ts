import { TErrorIssue, TErrorResponse } from "../../types/TErrorResponse";
import GenericError from "../../errorClasses/GenericError";

const handleGenericError = (err: GenericError): TErrorResponse => {
  const issues: TErrorIssue = [
    {
      path: "",
      message: err.message,
    },
  ];
  return {
    status: "error",
    statusCode: err.statusCode,
    message: err.message,
    issues,
  };
};

export default handleGenericError;
