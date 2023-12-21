import { Router } from "express";
import { routes } from "../constants/routes.constants";

const globalRouter = Router();

routes.forEach(item => {
  globalRouter.use(item.path, item.route);
});

export default globalRouter;
