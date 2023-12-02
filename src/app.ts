import express, { Application, Request, Response } from "express";
import cors from "cors";
import { userRouter } from "./routes/user.route";
import { tourRouter } from "./routes/tour.route";

export const app: Application = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/tour", tourRouter);
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Perfect! Server is running...",
    success: true,
  });
});

// catch all routes
// One way for catch not found route!
app.all("*", (req: Request, res: Response) => {
  res.status(404).json({
    statusCode: 404,
    message: `Route not found for ${req.originalUrl}!`,
  });
});
