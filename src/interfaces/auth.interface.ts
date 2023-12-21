import { IUser } from "./user.interface";

export interface IRegister
  extends Omit<IUser, "role" | "userStatus" | "passwordChangedAt"> {}
