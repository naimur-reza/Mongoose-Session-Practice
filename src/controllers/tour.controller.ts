import { Request, Response } from "express";
import { tourServices } from "../services/tour.service";

const createTour = async (req: Request, res: Response) => {
  try {
    const tourData = req.body;
    const result = await tourServices.createTour(tourData);
    res.status(201).json({
      success: true,
      message: "Tour inserted successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
      error: error,
    });
  }
};
const getAllTours = async (req: Request, res: Response) => {
  try {
    const result = await tourServices.getAllTours();
    res.status(200).json({
      success: true,
      message: "Tours retrieved successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
      error: error,
    });
  }
};

const getSingleTour = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await tourServices.getSingleTour(id);
    res.status(200).json({
      success: true,
      message: "Tour retrieved successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
      error: error,
    });
  }
};
const updateTour = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const tourData = req.body;
    const result = await tourServices.updateTour(id, tourData);
    res.status(200).json({
      success: true,
      message: "Tour updated successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
      error: error,
    });
  }
};
const deleteTour = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await tourServices.deleteTour(id);
    res.status(200).json({
      success: true,
      message: "Tour deleted successfully!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
      error: error,
    });
  }
};
const getNextSchedule = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const tour = await tourServices.getNextSchedule(id);
    res.status(200).json({
      success: true,
      message: "Nearest schedule fetched successfully!",
      data: tour,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
      error: error,
    });
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
