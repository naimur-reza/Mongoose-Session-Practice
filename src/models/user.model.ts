import { Schema, model } from "mongoose";
import { IUser } from "../interfaces/user.interface";

const userSchema = new Schema<IUser>({
  name: { type: String, required: [true, "Name is required"] },
  age: { type: Number, required: [true, "Age is required"] },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
  },
  photoURL: { type: String, required: [true, "Photo URL is required"] },
  role: {
    type: String,
    enum: {
      values: ["user", "admin"],
      message: "Role is either: user or admin. Your role is {VALUE}",
    },
    default: "user",
  },
  userStatus: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
});

export const User = model<IUser>("User", userSchema);
