import { Router } from "express";
import { AuthControllers } from "../controllers/auth.controllers";
import { validateRequest } from "../middleware/validateRequest";
import { loginValidationSchema } from "../validations/authValidation";

const router = Router();

router.post("/register", AuthControllers.register);

router.post(
  "/login",
  validateRequest(loginValidationSchema),
  AuthControllers.login,
);

export const AuthRouter = router;
