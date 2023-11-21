export interface ITour {
  name: string;
  durationHours: number;
  ratingQuantity: number;
  ratingAverage: number;
  price: number;
  imageCover: string;
  images: string[];
  createdAt: Date;
  startDates: Date[];
  startLocation: string;
  locations: string[];
  slug: string;
}
