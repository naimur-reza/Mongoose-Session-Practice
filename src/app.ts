import express, { Application, Request, Response } from "express";
import cors from "cors";
import { notFound } from "./middleware/notFound";
import { globalErrorHandler } from "./middleware/globalErrorHandler";
import globalRouter from "./routes";

export const app: Application = express();
app.use(cors());
app.use(express.json());
app.use("/api/v1", globalRouter);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Murir Server is running!",
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
