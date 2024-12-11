import { Request, Response } from "express";
const { status } = require("http-status");
const { authService } = require("../services");

const authController = {
  async register(req: Request, res: Response, next: any) {
    try {
      const { email, password } = req.body;
      const user = await authService.createUser(email, password);
      const token = await authService.genAuthToken(user);

      // Send verification email

      res
        .cookie("x-access-token", token)
        .status(status.CREATED)
        .send({ user, token });
    } catch (error: any) {
      res.status(status.BAD_REQUEST).send(error.message);
    }
  },
  async signin(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await authService.signInWithEmailAndPassword(
        email,
        password
      );
      const token = await authService.genAuthToken(user);
      res.cookie("x-access-token", token).send({ user, token });
    } catch (error: any) {
      res.status(status.BAD_REQUEST).send(error.message);
    }
  },
};

module.exports = authController;
