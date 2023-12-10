/* eslint-disable @typescript-eslint/no-explicit-any */
import { ITour } from "../interfaces/tour.interface";
import { TourModel } from "../models/tour.model";
import { filter } from "../helpers/filterHelper";
import { TQueryObj } from "../types/TQuery";

const createTour = async (tourData: ITour): Promise<ITour> => {
  const result = await TourModel.create(tourData);
  return result;
};

const getAllTours = async (query: TQueryObj): Promise<ITour[]> => {
  const modelQuery = filter(TourModel.find(), query);
  console.log(query);
  if (query.searchTerm) {
    const fieldValues = Object.values(modelQuery.model.schema.paths);
    const searchableFields = fieldValues
      .filter(el => {
        if (el.instance === "String") {
          return true;
        }
      })
      .map(el => ({
        [el.path]: { $regex: query.searchTerm, $options: "i" },
      }));
    modelQuery.find({
      $or : searchableFields
    });
    // console.log(searchableFields);
  }
  const result = await modelQuery;
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
