import express, { Router } from "express";
const authController = require("../controllers/auth.controller");
const authRouter = express.Router();

authRouter.post("/register", authController.register);
authRouter.post("/signin", authController.signin);

module.exports = authRouter;
