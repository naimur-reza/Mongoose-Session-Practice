/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { userServices } from "../services/user.service";
import { sendSuccessResponse } from "../utils/sendSuccessResponse";
import { catchAsyncFunction } from "../utils/catchAsyncFunction";

const createUser = catchAsyncFunction(async (req: Request, res: Response) => {
  const userData = req.body;
  const result = await userServices.createUser(userData);
  sendSuccessResponse(res, {
    message: "User created successfully!",
    statusCode: 201,
    data: result,
  });
});

const getAllUsers = catchAsyncFunction(async (req: Request, res: Response) => {
  const result = await userServices.getAllUsers();
  sendSuccessResponse(res, {
    message: "Users retrieved successfully!",
    statusCode: 200,
    data: result,
  });
});

const getSingleUser = catchAsyncFunction(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await userServices.getSingleUser(id);
    sendSuccessResponse(res, {
      message: "User retrieved successfully!",
      statusCode: 201,
      data: result,
    });
  },
);

const updateUser = catchAsyncFunction(async (req: Request, res: Response) => {
  const id = req.params.id;
  const userData = req.body;
  const result = await userServices.updateUser(id, userData);
  sendSuccessResponse(res, {
    message: "User updated successfully!",
    statusCode: 201,
    data: result,
  });
});

const deleteUser = catchAsyncFunction(async (req: Request, res: Response) => {
  const id = req.params.id;
  await userServices.deleteUser(id);
  sendSuccessResponse(res, {
    message: "User deleted successfully!",
    statusCode: 201,
    data: null,
  });
});

export const UserController = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
