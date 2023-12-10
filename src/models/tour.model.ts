import mongoose, { Schema } from "mongoose";
import { ITour, ITourMethods, TTourModel } from "../interfaces/tour.interface";

const tourSchema = new Schema<ITour, TTourModel, ITourMethods>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      unique: true,
    },
    durationHours: {
      type: Number,
      required: [true, "Duration is required"],
    },
    ratingQuantity: {
      type: Number,
      required: [true, "Rating quantity is required"],
    },
    ratingAverage: {
      type: Number,
      required: [true, "Rating average is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    availableSeats: {
      type: Number,
      required: true,
    },
    imageCover: {
      type: String,
      required: [true, "Image cover is required"],
    },
    images: {
      type: [String],
      required: [true, "Images are required"],
    },
    startDates: {
      type: [Date],
      required: [true, "Start dates are required"],
    },
    startLocation: {
      type: String,
      required: [true, "Start location is required"],
    },
    locations: {
      type: [String],
      required: [true, "Locations are required"],
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
    },
    discountPrice: { type: Number },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  },
);

tourSchema.virtual("durationDays").get(function () {
  return this.durationHours / 24;
});

tourSchema.methods.getNextNearestDateAndEndDate = function (): {
  nearestStartDate: Date | null;
  estimatedEndDate: Date | null;
} {
  const today = new Date();
  const futureDates = this.startDates.filter(
    (startDate: Date) => startDate > today,
  );
  futureDates.sort((a: Date, b: Date) => a.getTime() - b.getTime());
  const nearestStartDate = futureDates[0];
  const estimatedEndDate = new Date(
    nearestStartDate.getTime() + this.durationHours * 60 * 60 * 1000,
  );
  return {
    nearestStartDate,
    estimatedEndDate,
  };
};

export const TourModel = mongoose.model<ITour, TTourModel>("Tour", tourSchema);
