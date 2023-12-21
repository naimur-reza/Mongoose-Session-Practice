import { AuthRouter } from "../routes/auth.routes";
import { bookingRouter } from "../routes/booking.route";
import { tourRouter } from "../routes/tour.route";
import { userRouter } from "../routes/user.route";

export const routes = [
  {
    path: "/users",
    route: userRouter,
  },
  {
    path: "/tours",
    route: tourRouter,
  },
  {
    path: "/bookings",
    route: bookingRouter,
  },
  {
    path: "/auth",
    route: AuthRouter,
  },
];
