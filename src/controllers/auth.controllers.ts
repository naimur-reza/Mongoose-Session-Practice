import { Request, Response } from "express";
import { catchAsyncFunction } from "../utils/catchAsyncFunction";
import { AuthServices } from "../services/auth.service";
import { sendSuccessResponse } from "../utils/sendSuccessResponse";
import config from "../config";

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
  const { accessToken, refreshToken } = await AuthServices.login(req.body.data);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: config.node_env === "production",
  });

  sendSuccessResponse(res, {
    message: "User logged in successfully!",
    statusCode: 200,
    data: accessToken,
  });
});

const changePassword = catchAsyncFunction(async (req, res) => {
  console.log("change password is running");

  const user = await AuthServices.changePassword(req.user, req.body);
  sendSuccessResponse(res, {
    message: "Password changed successfully!",
    statusCode: 200,
    data: user,
  });
});

const refreshToken = catchAsyncFunction(async (req, res) => {
  const { refreshToken } = req.cookies;

  const accessToken = await AuthServices.refreshToken(refreshToken);

  sendSuccessResponse(res, {
    message: "Access token refreshed successfully!",
    statusCode: 200,
    data: accessToken,
  });
});

export const AuthControllers = {
  register,
  login,
  changePassword,
  refreshToken,
};
