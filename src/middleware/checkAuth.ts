import { NextFunction, Request, Response } from "express";
import { catchAsyncFunction } from "../utils/catchAsyncFunction";
import { User } from "../models/user.model";
import GenericError from "../errorClasses/GenericError";
import { USER_ROLE } from "../constants/user.constants";
import config from "../config";
import { verifyToken } from "../helpers/jwtHelper";
const checkAuth = (...roles: Array<keyof typeof USER_ROLE>) => {
  return catchAsyncFunction(
    async (req: Request, res: Response, next: NextFunction) => {
      console.log("checkAuth middleware is running");

      const token = req.headers.authorization;

      if (!token)
        throw new GenericError(
          "You are not authorized to access this route",
          401,
        );

      const decoded = verifyToken(token, config.jwt_access_secret);

      const { email } = decoded;

      const user = await User.findOne({ email });

      if (!user) throw new GenericError("Invalid email or password", 404);

      if (roles && !roles.includes(user.role))
        throw new GenericError(
          "You are not authorized to access this route",
          403,
        );

      if (user.userStatus !== "active")
        throw new GenericError("Your account is not active", 403);

      next();
    },
  );
};

export default checkAuth;
