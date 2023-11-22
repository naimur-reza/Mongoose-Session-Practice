import express from "express";
const router = express.Router();
import { TourController } from "../controllers/tour.controller";

router.get("/", TourController.getAllTours);
router.post("/create-tour", TourController.createTour);
router.get("/:id", TourController.getSingleTour);
router.patch("/:id", TourController.updateTour);
router.delete("/:id", TourController.deleteTour);
export const tourRouter = router;
