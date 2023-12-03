/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { bookingServices } from "../services/booking.service";
import { sendSuccessResponse } from "../utils/sendSuccessResponse";
import { catchAsyncFunction } from "../utils/catchAsyncFunction";

const createBooking = catchAsyncFunction(
  async (req: Request, res: Response) => {
    const bookingData = req.body;
    const result = await bookingServices.createBooking(bookingData);
    sendSuccessResponse(res, {
      message: "Booking created successfully!",
      statusCode: 201,
      data: result,
    });
  },
);

const getAllBooking = catchAsyncFunction(
  async (req: Request, res: Response) => {
    const result = await bookingServices.getAllBookings();
    sendSuccessResponse(res, {
      message: "Booking retrieved successfully!",
      statusCode: 200,
      data: result,
    });
  },
);

const getAllBookingsOfUser = catchAsyncFunction(
  async (req: Request, res: Response) => {
    const id = req.params._id;
    const result = await bookingServices.getAllBookingsOfUser(id);
    sendSuccessResponse(res, {
      message: "Booking retrieved successfully!",
      statusCode: 200,
      data: result,
    });
  },
);

const getSingleBooking = catchAsyncFunction(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await bookingServices.getSingleBooking(id);
    sendSuccessResponse(res, {
      message: "Booking retrieved successfully!",
      statusCode: 201,
      data: result,
    });
  },
);

const updateBooking = catchAsyncFunction(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const bookingData = req.body;
    const result = await bookingServices.updateBooking(id, bookingData);
    sendSuccessResponse(res, {
      message: "Booking updated successfully!",
      statusCode: 201,
      data: result,
    });
  },
);

const deleteBooking = catchAsyncFunction(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    await bookingServices.deleteBooking(id);
    sendSuccessResponse(res, {
      message: "Booking deleted successfully!",
      statusCode: 201,
      data: null,
    });
  },
);

export const BookingController = {
  createBooking,
  getAllBooking,
  getSingleBooking,
  getAllBookingsOfUser
  updateBooking,
  deleteBooking,
};
