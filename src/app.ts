import express, { Application, Request, Response } from "express";
import cors from "cors";
import { userRouter } from "./routes/user.route";

export const app: Application = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1/user", userRouter);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Perfect! Server is running...",
    success: true,
  });
});
