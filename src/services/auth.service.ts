import config from "../config";
import { ILogin, IRegister } from "../interfaces/auth.interface";
import { User } from "../models/user.model";
import { createToken, verifyToken } from "../helpers/jwtHelper";
import { comparePassword, hashedPassword } from "../helpers/passwordHelper";
import { JwtPayload } from "jsonwebtoken";
import GenericError from "../errorClasses/GenericError";
const register = async (payload: IRegister) => {
  const makeHashed = hashedPassword(payload.password);

  const user = await User.create({
    ...payload,
    password: makeHashed,
  });

  return user;
};

const login = async (payload: ILogin) => {
  const user = await User.findOne({ email: payload.email }).select("+password");

  console.log(payload);

  if (!user) throw new Error("User not found!");

  console.log(user);

  const isMatch = comparePassword(payload.password, user.password);
  if (!isMatch) throw new Error("Password not matched");

  const jwtPayload = {
    email: user.email,
    role: user.role,
  };
  const accessToken = createToken(jwtPayload, config.jwt_access_secret, {
    expiresIn: config.jwt_access_expires_in,
  });

  const refreshToken = createToken(jwtPayload, config.jwt_refresh_secret, {
    expiresIn: config.jwt_refresh_expires_in,
  });

  return { accessToken, refreshToken };
};

const changePassword = async (
  decoded: JwtPayload,
  payload: {
    oldPassword: string;
    newPassword: string;
  },
) => {
  const { email, iat } = decoded;

  const user = await User.findOne({ email }).select("+password");

  if (!user) throw new GenericError("User not found!", 404);

  const isMatch = comparePassword(payload.oldPassword, user.password);
  if (!isMatch) throw new GenericError("Password not matched", 400);

  if (
    user.passwordChangedAt &&
    (iat as number) < new Date(user.passwordChangedAt).getTime() / 1000
  )
    throw new GenericError("Old Token", 400);

  const newHashedPassword = hashedPassword(payload.newPassword);

  const updateUser = await User.findOneAndUpdate(
    { email },
    {
      password: newHashedPassword,
      passwordChangedAt: new Date(),
    },
    {
      new: true,
    },
  );

  return updateUser;
};

const refreshToken = async (refreshToken: string) => {
  if (!refreshToken) throw new GenericError("Invalid token!", 400);

  const decoded = verifyToken(refreshToken, config.jwt_refresh_secret);

  const { email } = decoded as JwtPayload;

  const user = await User.findOne({ email });

  if (!user) throw new GenericError("Invalid token!", 400);

  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  const accessToken = createToken(jwtPayload, config.jwt_access_secret, {
    expiresIn: config.jwt_access_expires_in,
  });

  return accessToken;
};

export const AuthServices = {
  register,
  login,
  changePassword,
  refreshToken,
};
