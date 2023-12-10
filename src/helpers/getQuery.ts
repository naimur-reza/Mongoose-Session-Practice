import { Query } from "mongoose";
import { filter } from "./filterHelper";
import { paginate } from "./paginateHelper";
import search from "./searchHelper";
import { sort } from "./sortHelper";
import { TQueryObj } from "../types/TQuery";
import { select } from "./fieldselectHelper";

export const getQuery = <T>(modelQuery: Query<T[], T>, query: TQueryObj) => {
  const filteredQuery = filter(modelQuery, query);
  const searchedQuery = search(filteredQuery, query);
  const sortedQuery = sort(searchedQuery, query);
  const paginatedQuery = paginate(sortedQuery, query);
  const selectedFieldQuery = select(paginatedQuery, query);
  return selectedFieldQuery;
};
