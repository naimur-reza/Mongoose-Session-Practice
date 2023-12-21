import { Request, Response } from "express";
import { catchAsyncFunction } from "../utils/catchAsyncFunction";
import { AuthServices } from "../services/auth.service";
import { sendSuccessResponse } from "../utils/sendSuccessResponse";

const register = catchAsyncFunction(async (req: Request, res: Response) => {
  const user = await AuthServices.register(req.body);

  sendSuccessResponse(res, {
    message: "User registered successfully!",
    statusCode: 201,
    data: user,
  });

  console.log("register service is running");
});

const login = catchAsyncFunction(async (req, res) => {
  console.log("login service is running");

  const user = await AuthServices.login(req.body.data);
  sendSuccessResponse(res, {
    message: "User logged in successfully!",
    statusCode: 200,
    data: user,
  });
});

export const AuthControllers = {
  register,
  login,
};
