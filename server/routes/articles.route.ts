import express from "express";
const auth = require("../middleware/auth");
const articlesController = require("../controllers/articles.controller");
const { addArticleValidator } = require("../middleware/validation");
const articlesRouter = express.Router();

articlesRouter.post(
  "/",
  auth("createAny", "articles"),
  addArticleValidator,
  articlesController.createArticle
);

// Categories
articlesRouter
  .route("/categories")
  .post(auth("createAny", "categories"), articlesController.createCategory)
  .get(auth("readAny", "categories"), articlesController.getCategories);

module.exports = articlesRouter;
