import { Query } from "mongoose";
import { TQueryObj } from "../types/TQuery";

export const sort = <T>(modelQuery: Query<T[], T>, query: TQueryObj) => {
  if (query.sortBy && query.sortOrder) {
    const sortBy = query.sortBy; //"price" | "duration" | "ratingsAverage"
    const sortOrder = query.sortOrder; //"asc" | "desc"
    const sortStr = `${sortOrder === "desc" ? "-" : ""}${sortBy}`;
    modelQuery.sort(sortStr);
  }

  return modelQuery;
};
