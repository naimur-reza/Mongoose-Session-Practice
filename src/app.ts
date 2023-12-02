import express, { Application, Request, Response } from "express";
import cors from "cors";
import { userRouter } from "./routes/user.route";
import { tourRouter } from "./routes/tour.route";
import { notFound } from "./middleware/notFound";
import { globalErrorHandler } from "./middleware/globalErrorHandler";

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
// app.all("*", notFound);

// way-2 to use middleware by defining global route
// app.use("*", notFound);

// way-3 this is the best approach
app.use(notFound);

// global error handler
app.use(globalErrorHandler);
