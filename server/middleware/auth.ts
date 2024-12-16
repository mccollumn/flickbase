const passport = require("passport");
const { APIError } = require("./apiError");
const { status } = require("http-status");
const { roles } = require("../config/roles");
import { Response } from "express";
import { IUser, IUserRequest } from "../models/user";

type Rights = [string, string];

const verify =
  (
    req: IUserRequest,
    res: Response,
    resolve: any,
    reject: any,
    rights: Rights
  ) =>
  async (err: any, user: IUser) => {
    if (err || !user) {
      reject(new APIError(status.UNAUTHORIZED, "Unauthorized"));
      return;
    }

    req.user = {
      _id: user._id,
      email: user.email,
      role: user.role,
      firstname: user.firstname,
      lastname: user.lastname,
      age: user.age,
      verified: user.verified,
    };

    if (rights.length) {
      const action = rights[0];
      const resource = rights[1];
      const permission = roles.can(req.user.role)[action](resource);
      if (!permission.granted) {
        reject(new APIError(status.FORBIDDEN, "Forbidden"));
        return;
      }
      res.locals.permission = permission;
    }

    resolve();
  };

const auth =
  (...rights: Rights) =>
  async (req: IUserRequest, res: Response, next: any) => {
    return new Promise((resolve, reject) => {
      passport.authenticate(
        "jwt",
        { session: false },
        verify(req, res, resolve, reject, rights)
      )(req, res, next);
    })
      .then(() => next())
      .catch((err: any) => next(err));
  };

module.exports = auth;
