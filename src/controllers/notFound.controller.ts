import { Request, Response } from "express";

export const notFound = (req: Request, res: Response) => {
  res.status(404).json({
    statusCode: 404,
    message: `Route not found for ${req.originalUrl}!`,
  });
};
