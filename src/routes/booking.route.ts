import express from "express";
import { BookingController } from "../controllers/booking.controller";

const router = express.Router();

router.get("/", BookingController.getAllBooking);

router.post("/create-booking", BookingController.createBooking);

router.get("/:id", BookingController.getSingleBooking);

router.get("/:id/get-all-bookings", BookingController.getAllBookingsOfUser);

router.patch("/:id", BookingController.updateBooking);

router.delete("/:id", BookingController.deleteBooking);

export const bookingRouter = router;
