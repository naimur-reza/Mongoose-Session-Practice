/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import { IBooking } from "../interfaces/booking.interface";
import Booking from "../models/booking.model";
import { TourModel } from "../models/tour.model";

const createBooking = async (bookingData: IBooking): Promise<IBooking> => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const result = await Booking.create([bookingData], { session });

    if (!result) throw new Error("Booking failed!");

    const tour = await TourModel.findOneAndUpdate(
      result[0].tour,
      {
        $inc: { availableSeats: -result[0].bookedSlots },
      },
      { session },
    );

    if (!tour) throw new Error("Tour update failed!");

    await session.commitTransaction();
    session.endSession();

    return result[0];
  } catch (error: any) {
    await session.abortTransaction();
    session.endSession();
    throw new Error(error);
  }
};

const getAllBookings = async (): Promise<IBooking[]> => {
  const result = await Booking.find().populate("user").populate("tour");
  return result;
};

const getAllBookingsOfUser = async (id: string): Promise<IBooking[]> => {
  const result = await Booking.find({ user: id });
  return result;
};

const getSingleBooking = async (id: string): Promise<IBooking | null> => {
  const result = Booking.findById(id);
  return result;
};

const updateBooking = async (
  id: string,
  updatedData: IBooking,
): Promise<IBooking | null> => {
  const result = Booking.findByIdAndUpdate(id, updatedData, {
    runValidators: true,
    new: true,
  });
  return result;
};

const deleteBooking = async (id: string): Promise<IBooking | null> => {
  const result = Booking.findByIdAndDelete(id);
  return result;
};

export const bookingServices = {
  createBooking,
  getAllBookings,
  getSingleBooking,
  updateBooking,
  deleteBooking,
  getAllBookingsOfUser,
};
