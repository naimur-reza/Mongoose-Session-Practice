import { NextFunction, Request, Response } from "express";
import { tourServices } from "../services/tour.service";
import { sendSuccessResponse } from "../utils/sendSuccessResponse";

const createTour = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tourData = req.body;
    const result = await tourServices.createTour(tourData);
    sendSuccessResponse(res, {
      message: "Tour created successfully!",
      statusCode: 201,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllTours = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await tourServices.getAllTours();
    sendSuccessResponse(res, {
      message: "Tours retrieved successfully!",
      statusCode: 200,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleTour = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;
    const result = await tourServices.getSingleTour(id);
    sendSuccessResponse(res, {
      message: "Tour retrieved successfully!",
      statusCode: 201,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateTour = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const tourData = req.body;
    const result = await tourServices.updateTour(id, tourData);
    sendSuccessResponse(res, {
      message: "Tour updated successfully!",
      statusCode: 201,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteTour = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    await tourServices.deleteTour(id);
    sendSuccessResponse(res, {
      message: "Tour deleted successfully!",
      statusCode: 201,
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

const getNextSchedule = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;
    const tour = await tourServices.getNextSchedule(id);
    sendSuccessResponse(res, {
      message: "Tour schedule retrieved successfully!",
      statusCode: 201,
      data: tour,
    });
  } catch (error) {
    next(error);
  }
};

export const TourController = {
  createTour,
  getAllTours,
  getSingleTour,
  updateTour,
  deleteTour,
  getNextSchedule,
};
