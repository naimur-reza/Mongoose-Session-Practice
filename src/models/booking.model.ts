import { Schema, model } from "mongoose";
import { IBooking } from "../interfaces/booking.interface";
import { TourModel } from "./tour.model";
import GenericError from "../errorClasses/GenericError";

const bookingSchema = new Schema<IBooking>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  tour: {
    type: Schema.Types.ObjectId,
    ref: "Tour",
  },
  bookedSlots: {
    type: Number,
    required: [true, "A booking must have bookedSlots"],
  },
  bookingStatus: {
    type: String,
    enum: ["pending", "paid", "cancelled"],
    required: [true, "A booking must have a bookingStatus"],
  },

  price: {
    type: Number,
  },
});

bookingSchema.pre("save", async function (next) {
  const tour = await TourModel.findOne({ _id: this.tour });

  if (!tour) throw new GenericError("Tour not found!", 400);

  this.price = tour.price * this.bookedSlots;

  next();
});

const Booking = model<IBooking>("Booking", bookingSchema);

export default Booking;
