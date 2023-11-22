import { ITour } from "../interfaces/tour.interface";
import { TourModel } from "../models/tour.model";

const createTour = async (tourData: ITour): Promise<ITour> => {
  const result = await TourModel.create(tourData);
  return result;
};

const getAllTours = async (): Promise<ITour[]> => {
  const result = await TourModel.find();
  return result;
};

const getSingleTour = async (id: string): Promise<ITour | null> => {
  const result = TourModel.findById(id);
  return result;
};

const updateTour = async (
  id: string,
  updatedData: ITour,
): Promise<ITour | null> => {
  const result = TourModel.findByIdAndUpdate(id, updatedData, {
    runValidators: true,
    new: true,
  });
  return result;
};

const deleteTour = async (id: string): Promise<ITour | null> => {
  const result = TourModel.findByIdAndDelete(id);
  return result;
};

export const tourServices = {
  createTour,
  getAllTours,
  getSingleTour,
  updateTour,
  deleteTour,
};
