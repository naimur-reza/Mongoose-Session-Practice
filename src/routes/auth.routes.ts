import { Router } from "express";
import { AuthControllers } from "../controllers/auth.controllers";

const router = Router();

router.post("/register", AuthControllers.register);

router.post("/login", AuthControllers.login);

export const AuthRouter = router;
