import { Router } from "express";
import { AuthControllers } from "../controllers/auth.controllers";
import { validateRequest } from "../middleware/validateRequest";
import { loginValidationSchema } from "../validations/authValidation";
import checkAuth from "../middleware/checkAuth";

const router = Router();

router.post("/register", AuthControllers.register);

router.post(
  "/login",
  validateRequest(loginValidationSchema),
  AuthControllers.login,
);
router.post(
  "/change-password",
  checkAuth("admin", "user"),
  AuthControllers.changePassword,
);
router.post("/refresh-token", AuthControllers.refreshToken);

export const AuthRouter = router;
