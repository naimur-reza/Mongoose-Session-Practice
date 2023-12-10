import { Model } from "mongoose";

interface ITour {
  name: string;
  durationHours: number;
  ratingQuantity: number;
  ratingAverage: number;
  price: number;
  discountPrice?: number;
  availableSeats: number;
  imageCover: string;
  images: string[];
  startDates: Date[];
  startLocation: string;
  locations: string[];
  slug: string;
}

interface ITourMethods {
  getNextNearestDateAndEndDate(): {
    nearestStartDate: Date | null;
    estimatedEndDate: Date | null;
  };
}
type TTourModel = Model<ITour, object, ITourMethods>;

export { ITour, TTourModel, ITourMethods };
