import express from "express";
const userRouter = express.Router();
const userController = require("../controllers/user.controller");
const auth = require("../middleware/auth");

userRouter
  .route("/profile")
  .get(auth("readOwn", "profile"), userController.profile)
  .patch(auth("updateOwn", "profile"), userController.updateProfile);

module.exports = userRouter;
