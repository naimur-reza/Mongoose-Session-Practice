import config from "../config";
import { ILogin, IRegister } from "../interfaces/auth.interface";
import { User } from "../models/user.model";
import jwt from "jsonwebtoken";

const register = async (payload: IRegister) => {
  const user = await User.create(payload);
  return user;
};

const login = async (payload: ILogin) => {
  const user = await User.findOne(payload);
  if (!user) throw new Error("Invalid credentials");

  const jwtPayload = {
    email: user.email,
    role: user.role,
  };
  const token = jwt.sign(jwtPayload, config.jwt_access_secret, {
    expiresIn: config.jwt_access_expires_in,
  });
  return token;
};

export const AuthServices = {
  register,
  login,
};
