/* eslint-disable @typescript-eslint/no-explicit-any */
import { ITour } from "../interfaces/tour.interface";
import { TourModel } from "../models/tour.model";
import { filter } from "../helpers/filterHelper";
import { TQueryObj } from "../types/TQuery";
import search from "../helpers/searchHelper";
import { sort } from "../helpers/sortHelper";

const createTour = async (tourData: ITour): Promise<ITour> => {
  const result = await TourModel.create(tourData);
  return result;
};

const getAllTours = async (query: TQueryObj): Promise<ITour[]> => {
  const modelQuery = filter(TourModel.find(), query);
  const searchQuery = search(modelQuery, query);
  const sortQuery = sort(searchQuery, query);

  if (query.page && query.limit) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = (page - 1) * limit;
    sortQuery.skip(skip).limit(limit);
  } else {
    sortQuery.skip(0).limit(10);
  }

  const result = await sortQuery;
  return result;
};

const getSingleTour = async (id: string): Promise<ITour | null> => {
  const result = await TourModel.findById(id);
  return result;
};

const updateTour = async (
  id: string,
  updatedData: ITour,
): Promise<ITour | null> => {
  const result = await TourModel.findByIdAndUpdate(id, updatedData, {
    runValidators: true,
    new: true,
  });
  return result;
};

const deleteTour = async (id: string): Promise<ITour | null> => {
  const result = await TourModel.findByIdAndDelete(id);
  return result;
};
const getNextSchedule = async (id: string) => {
  const tour = await TourModel.findById(id);
  const nextSchedule = tour?.getNextNearestDateAndEndDate();
  return {
    tour,
    nextSchedule,
  };
};

export const tourServices = {
  createTour,
  getAllTours,
  getSingleTour,
  updateTour,
  deleteTour,
  getNextSchedule,
};
