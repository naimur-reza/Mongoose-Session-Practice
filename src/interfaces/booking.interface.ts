import { Schema } from "mongoose";

export interface IBooking {
  createdAt: Date;
  user: Schema.Types.ObjectId;
  tour: Schema.Types.ObjectId;
}
