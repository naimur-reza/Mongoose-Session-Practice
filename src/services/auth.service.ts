import { ILogin, IRegister } from "../interfaces/auth.interface";
import { User } from "../models/user.model";

const register = async (payload: IRegister) => {
  const user = await User.create(payload);
  return user;
};

const login = async (payload: ILogin) => {
  const user = await User.findOne(payload);
  if (!user) throw new Error("Invalid credentials");
  return null;
};

export const AuthServices = {
  register,
  login,
};
