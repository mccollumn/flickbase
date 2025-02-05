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

articlesRouter
  .route("/article/:id")
  .get(auth("readAny", "articles"), articlesController.getArticleById)
  .patch(auth("updateAny", "articles"), articlesController.updateArticleById)
  .delete(auth("deleteAny", "articles"), articlesController.deleteArticleById);

// Categories
articlesRouter
  .route("/categories")
  .post(auth("createAny", "categories"), articlesController.createCategory)
  .get(auth("readAny", "categories"), articlesController.getCategories);

module.exports = articlesRouter;
