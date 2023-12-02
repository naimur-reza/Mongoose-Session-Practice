import { Response } from "express";

interface TSuccessResponse<T> {
  statusCode: number;
  message: string;
  data: T | T[];
}
export const sendSuccessResponse = <T>(
  res: Response,
  data: TSuccessResponse<T>,
) => {
  res.status(data.statusCode).json({
    status: "success",
    message: data.message,
    data: data.data,
  });
};
