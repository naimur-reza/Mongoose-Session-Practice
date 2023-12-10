import { FilterQuery, Query } from "mongoose";
import { TQueryObj } from "../types/TQuery";

const search = <T>(modelQuery: Query<T[], T>, query: TQueryObj) => {
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
      $or: searchableFields as FilterQuery<T[]>,
    });
  }
  return modelQuery;
};

export default search;
