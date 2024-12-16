import express, { Router } from "express";
const authController = require("../controllers/auth.controller");
const authRouter = express.Router();

// Middleware
const auth = require("../middleware/auth");

authRouter.post("/register", authController.register);
authRouter.post("/signin", authController.signin);
authRouter.get("/isauth", auth(), authController.isAuth);
// authRouter.post(
//   "/testrole",
//   auth("createAny", "test"),
//   authController.testRole
// );

module.exports = authRouter;
