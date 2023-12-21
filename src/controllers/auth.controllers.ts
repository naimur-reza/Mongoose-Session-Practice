import { NextFunction, Request, Response } from "express";
import { catchAsyncFunction } from "../utils/catchAsyncFunction";

const register = catchAsyncFunction(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("register service is running");
  },
);

const login = catchAsyncFunction(async (req, res, next) => {
  console.log("login service is running");
});

export const AuthControllers = {
  register,
  login,
};
