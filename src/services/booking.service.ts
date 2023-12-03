import { IBooking } from "../interfaces/booking.interface";
import Booking from "../models/booking.model";

const createBooking = async (bookingData: IBooking): Promise<IBooking> => {
  const result = await Booking.create(bookingData);
  return result;
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
