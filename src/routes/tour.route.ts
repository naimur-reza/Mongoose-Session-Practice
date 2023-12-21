import express from "express";
const router = express.Router();
import { TourController } from "../controllers/tour.controller";
import checkAuth from "../middleware/checkAuth";
// import { validateRequest } from "../middleware/validateRequest";
// import { createTourZodSchema } from "../validations/tour.validation";

router.get("/", checkAuth, TourController.getAllTours);
router.post(
  "/create-tour",
  //   validateRequest(createTourZodSchema),
  TourController.createTour,
);
router.get("/:id", TourController.getSingleTour);
router.patch("/:id", TourController.updateTour);
router.delete("/:id", TourController.deleteTour);
router.get("/:id/next-schedule", TourController.getNextSchedule);
export const tourRouter = router;
