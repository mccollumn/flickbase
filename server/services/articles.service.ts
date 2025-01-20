const { Category } = require("../models/category");
const { Article } = require("../models/article");
const { APIError } = require("../middleware/apiError");

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
  addCategory,
  findAllCategories,
};
