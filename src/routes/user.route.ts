import express from "express";
const router = express.Router();
import { UserController } from "../controllers/user.controller";

router.post("/create-user", UserController.createUser);

export const userRouter = router;
