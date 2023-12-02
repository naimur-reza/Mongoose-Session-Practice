import { NextFunction, Request, Response } from "express";
import { userServices } from "../services/user.service";
import { sendSuccessResponse } from "../utils/sendSuccessResponse";

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const result = await userServices.createUser(userData);
    sendSuccessResponse(res, {
      message: "User created successfully!",
      statusCode: 201,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
      error: error,
    });
  }
};
const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userServices.getAllUsers();
    sendSuccessResponse(res, {
      message: "Users retrieved successfully!",
      statusCode: 200,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;
    const result = await userServices.getSingleUser(id);
    sendSuccessResponse(res, {
      message: "User retrieved successfully!",
      statusCode: 201,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const userData = req.body;
    const result = await userServices.updateUser(id, userData);
    sendSuccessResponse(res, {
      message: "User updated successfully!",
      statusCode: 201,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    await userServices.deleteUser(id);
    sendSuccessResponse(res, {
      message: "User deleted successfully!",
      statusCode: 201,
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

export const UserController = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
