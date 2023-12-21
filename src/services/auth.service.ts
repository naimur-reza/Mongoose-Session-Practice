import { IRegister } from "../interfaces/auth.interface";
import { User } from "../models/user.model";

const register = async (payload: IRegister) => {
  const user = await User.create(payload);
  return user;
};

const login = async () => {};

export const AuthServices = {
  register,
  login,
};
