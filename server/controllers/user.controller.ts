import { Response } from "express";
import { IUserRequest } from "../models/user";
const { status } = require("http-status");
const { APIError } = require("../middleware/apiError");
const { userService } = require("../services");

const userController = {
  async profile(req: IUserRequest, res: Response, next: any) {
    try {
      const user = await userService.findUserById(req.user._id);
      if (!user) {
        throw new APIError(status.NOT_FOUND, "User not found");
      }
      res.json(user);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = userController;
