import express from "express";
const router = express.Router();
import { UserController } from "../controllers/user.controller";
import checkAuth from "../middleware/checkAuth";

router.get("/", checkAuth("admin"), UserController.getAllUsers);
router.post("/create-user", UserController.createUser);
router.get("/:id", UserController.getSingleUser);
router.patch("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUser);
export const userRouter = router;
