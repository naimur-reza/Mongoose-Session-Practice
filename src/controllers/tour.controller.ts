import { Request, Response } from "express";
import { tourServices } from "../services/tour.service";
import { sendSuccessResponse } from "../utils/sendSuccessResponse";
import { catchAsyncFunction } from "../utils/catchAsyncFunction";
import validateRequest from "../utils/validateRequest";
import { createTourZodSchema } from "../validations/tour.validation";

const createTour = catchAsyncFunction(async (req: Request, res: Response) => {
  validateRequest(createTourZodSchema);
  const tourData = req.body;
  const result = await tourServices.createTour(tourData);
  sendSuccessResponse(res, {
    message: "Tour created successfully!",
    statusCode: 201,
    data: result,
  });
});

const getAllTours = catchAsyncFunction(async (req: Request, res: Response) => {
  const result = await tourServices.getAllTours(req.query);

  sendSuccessResponse(res, {
    message: "Tours retrieved successfully!",
    statusCode: 200,
    data: result,
  });
});

const getSingleTour = catchAsyncFunction(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await tourServices.getSingleTour(id);
    sendSuccessResponse(res, {
      message: "Tour retrieved successfully!",
      statusCode: 201,
      data: result,
    });
  },
);

const updateTour = catchAsyncFunction(async (req: Request, res: Response) => {
  const id = req.params.id;
  const tourData = req.body;
  const result = await tourServices.updateTour(id, tourData);
  sendSuccessResponse(res, {
    message: "Tour updated successfully!",
    statusCode: 201,
    data: result,
  });
});

const deleteTour = catchAsyncFunction(async (req: Request, res: Response) => {
  const id = req.params.id;
  await tourServices.deleteTour(id);
  sendSuccessResponse(res, {
    message: "Tour deleted successfully!",
    statusCode: 201,
    data: null,
  });
});

const getNextSchedule = catchAsyncFunction(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const tour = await tourServices.getNextSchedule(id);
    sendSuccessResponse(res, {
      message: "Tour schedule retrieved successfully!",
      statusCode: 201,
      data: tour,
    });
  },
);

export const TourController = {
  createTour,
  getAllTours,
  getSingleTour,
  updateTour,
  deleteTour,
  getNextSchedule,
};
