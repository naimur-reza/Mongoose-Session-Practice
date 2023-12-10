/* eslint-disable @typescript-eslint/no-explicit-any */
import { ITour } from "../interfaces/tour.interface";
import { TourModel } from "../models/tour.model";
import { filter } from "../helpers/filterHelper";
import { TQueryObj } from "../types/TQuery";
import search from "../helpers/searchHelper";
import { sort } from "../helpers/sortHelper";
import { paginate } from "../helpers/paginateHelper";

const createTour = async (tourData: ITour): Promise<ITour> => {
  const result = await TourModel.create(tourData);
  return result;
};

const getAllTours = async (query: TQueryObj): Promise<ITour[]> => {
  const modelQuery = filter(TourModel.find(), query);
  const searchQuery = search(modelQuery, query);
  const sortQuery = sort(searchQuery, query);
  const paginateQuery = paginate(sortQuery, query);

  const result = await paginateQuery;
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
