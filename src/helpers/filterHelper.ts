import { Query } from "mongoose";
import { TQueryObj } from "../types/TQuery";

export const filter = <T>(model: Query<T[], T>, query: TQueryObj) => {
  const excludedFields = ["sort", "limit", "page", "searchTerm", "sortBy"];

  const queryObj = { ...query };
  excludedFields.forEach(el => delete queryObj[el]);

  const modelQuery = model.find(queryObj);
  return modelQuery;
};
