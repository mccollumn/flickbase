const passport = require("passport");
const { APIError } = require("./apiError");
const { status } = require("http-status");
import { Response } from "express";
import { IUser, IUserRequest } from "../models/user";

const verify =
  (req: IUserRequest, res: Response, resolve: any, reject: any) =>
  async (err: any, user: IUser) => {
    if (err || !user) {
      reject(new APIError(status.UNAUTHORIZED, "Unauthorized"));
    }
    req.user = user;
    resolve();
  };

const auth = () => async (req: IUserRequest, res: Response, next: any) => {
  return new Promise((resolve, reject) => {
    passport.authenticate(
      "jwt",
      { session: false },
      verify(req, res, resolve, reject)
    )(req, res, next);
  })
    .then(() => next())
    .catch((err: any) => next(err));
};

module.exports = auth;
