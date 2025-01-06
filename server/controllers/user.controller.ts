import { Response } from "express";
import { IUserRequest } from "../models/user";
const { status } = require("http-status");
const { APIError } = require("../middleware/apiError");
const { userService, authService, emailService } = require("../services");

const userController = {
  async profile(req: IUserRequest, res: Response, next: any) {
    try {
      const user = await userService.findUserById(req.user._id);
      if (!user) {
        throw new APIError(status.NOT_FOUND, "User not found");
      }
      res.json(res.locals.permission.filter(user._doc));
    } catch (error) {
      next(error);
    }
  },
  async updateProfile(req: IUserRequest, res: Response, next: any) {
    try {
      const user = await userService.updateUserProfile(req);
      res.json(res.locals.permission.filter(user._doc));
    } catch (error) {
      next(error);
    }
  },
  async updateEmail(req: IUserRequest, res: Response, next: any) {
    try {
      const user = await userService.updateUserEmail(req);
      const token = await authService.genAuthToken(user);

      // Send email
      await emailService.registerEmail(user.email, user);

      res
        .cookie("x-access-token", token)
        .send({ user: res.locals.permission.filter(user._doc), token });
    } catch (error) {
      next(error);
    }
  },
  async verifyAccount(req: IUserRequest, res: Response, next: any) {
    try {
      const token = userService.validateToken(req.query.validation);
      const user = await userService.findUserById(token.sub);

      if (!user) {
        throw new APIError(status.NOT_FOUND, "User not found");
      }
      if (user.verified) {
        throw new APIError(status.BAD_REQUEST, "Account already verified");
      }

      user.verified = true;
      await user.save();
      res.status(status.CREATED).send({ email: user.email, verified: true });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = userController;
