import mongoose, { Schema } from "mongoose";
import { ITour } from "../interfaces/tour.interface";

const tourSchema = new Schema<ITour>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
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
    imageCover: {
      type: String,
      required: [true, "Image cover is required"],
    },
    images: {
      type: [String],
      required: [true, "Images are required"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
      required: [true, "CreatedAt is required"],
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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

tourSchema.virtual("durationDays").get(function () {
  return this.durationHours / 24;
});

export const TourModel = mongoose.model<ITour>("Tour", tourSchema);
