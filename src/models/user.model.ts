import { Document, Query, Schema, model } from "mongoose";
import { IUser } from "../interfaces/user.interface";
import { ACCOUNT_STATUS, USER_ROLE } from "../constants/user.constants";

const userSchema = new Schema<IUser>({
  name: { type: String, required: [true, "Name is required"] },
  age: { type: Number, required: [true, "Age is required"] },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
  },
  password: { type: String, required: [true, "Password is required"] },
  passwordChangedAt: { type: String, default: null },
  photoURL: { type: String, required: [true, "Photo URL is required"] },
  role: {
    type: String,
    enum: {
      values: Object.values(USER_ROLE),
      message: "Role is either: user or admin. Your role is {VALUE}",
    },
    default: "user",
  },
  userStatus: {
    type: String,
    enum: Object.values(ACCOUNT_STATUS),
    default: "active",
  },
});

userSchema.pre(/^find/, function (this: Query<IUser, Document>, next) {
  this.find({ userStatus: { $eq: "active" } });
  next();
});

export const User = model<IUser>("User", userSchema);
