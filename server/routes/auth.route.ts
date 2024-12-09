import express, { Router } from "express";
const authController = require("../controllers/auth.controller");
const authRouter = express.Router();

authRouter.post("/register", authController.register);

module.exports = authRouter;
