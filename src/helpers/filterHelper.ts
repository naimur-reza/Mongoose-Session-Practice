import { Query } from "mongoose";
import { TQueryObj } from "../types/TQuery";

export const filter = <T>(model: Query<T[], T>, queryObj: TQueryObj) => {
  const excludedFields = ["sort", "limit", "page", "searchTerm", "sortBy"];

  excludedFields.forEach(el => delete queryObj[el]);

  const modelQuery = model.find(queryObj);
  return modelQuery;
};
