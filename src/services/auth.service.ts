import config from "../config";
import { ILogin, IRegister } from "../interfaces/auth.interface";
import { User } from "../models/user.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const register = async (payload: IRegister) => {
  const hashedPassword = bcrypt.hashSync(payload.password, 10);

  const user = await User.create({
    ...payload,
    password: hashedPassword,
  });

  return user;
};

const login = async (payload: ILogin) => {
  const user = await User.findOne({ email: payload.email }).select("+password");

  console.log(payload);

  if (!user) throw new Error("User not found!");

  console.log(user);

  const isMatch = bcrypt.compareSync(payload.password, user.password);
  if (!isMatch) throw new Error("Password not matched");

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
