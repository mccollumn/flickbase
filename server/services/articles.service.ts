const { Category } = require("../models/category");
const { Article } = require("../models/article");
const { APIError } = require("../middleware/apiError");
import { IUser } from "../models/user";

type ArticleBody = Body & {
  title: string;
  content: string;
  excerpt: string;
  score: number;
  director: string;
  actors: string[];
  status: string;
  category: string;
  date: Date;
};

const addArticle = async (body: ArticleBody) => {
  try {
    const article = new Article({ ...body, score: body.score });
    await article.save();
    return article;
  } catch (error) {
    throw error;
  }
};

const getArticleById = async (id: string, user: IUser) => {
  try {
    if (user.role === "user") {
      throw new APIError(403, "Forbidden");
    }
    const article = await Article.findById(id).populate("category");
    if (!article) {
      throw new APIError(404, "Article not found");
    }
    return article;
  } catch (error) {
    throw error;
  }
};

const updateArticleById = async (_id: string, body: ArticleBody) => {
  try {
    console.log(body);
    console.log(_id);
    const article = await Article.findOneAndUpdate(
      { _id },
      { $set: body },
      { new: true }
    ).populate("category");
    console.log(article);
    if (!article) {
      throw new APIError(404, "Article not found");
    }
    return article;
  } catch (error) {
    throw error;
  }
};

const addCategory = async (body: Body) => {
  try {
    const category = new Category({ ...body });
    await category.save();
    return category;
  } catch (error) {
    throw error;
  }
};

const findAllCategories = async () => {
  try {
    const categories = await Category.find();
    return categories;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addArticle,
  getArticleById,
  updateArticleById,
  addCategory,
  findAllCategories,
};
