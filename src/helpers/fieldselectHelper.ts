import { Query } from "mongoose";
import { TQueryObj } from "../types/TQuery";

export const select = <T>(modelQuery: Query<T[], T>, query: TQueryObj) => {
  if (query.fields) {
    const fields = query.fields.split(",").join(" ");
    modelQuery.projection(fields);
  }

  return modelQuery;
};
