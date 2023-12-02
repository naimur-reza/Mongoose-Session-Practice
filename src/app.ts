import express, { Application, Request, Response } from "express";
import cors from "cors";
import { userRouter } from "./routes/user.route";
import { tourRouter } from "./routes/tour.route";
import { notFound } from "./controllers/notFound.controller";

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
app.all("*", notFound);
