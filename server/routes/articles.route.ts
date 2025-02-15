import express from "express";
const auth = require("../middleware/auth");
const articlesController = require("../controllers/articles.controller");
const articlesRouter = express.Router();

// Categories
articlesRouter
  .route("/categories")
  .post(auth("createAny", "categories"), articlesController.createCategory)
  .get(auth("readAny", "categories"), articlesController.getCategories);

module.exports = articlesRouter;
