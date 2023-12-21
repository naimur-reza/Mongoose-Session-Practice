import { IUser } from "./user.interface";

export interface IRegister
  extends Omit<IUser, "role" | "userStatus" | "passwordChangedAt"> {}

export interface ILogin {
  email: string;
  password: string;
}
