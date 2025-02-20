const { Category } = require("../models/category");
const { Article } = require("../models/article");
const { APIError } = require("../middleware/apiError");
import { IUser, IUserRequest } from "../models/user";

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
    const article = await Article.findOneAndUpdate(
      { _id },
      { $set: body },
      { new: true }
    ).populate("category");
    if (!article) {
      throw new APIError(404, "Article not found");
    }
    return article;
  } catch (error) {
    throw error;
  }
};

const deleteArticleById = async (_id: string) => {
  try {
    const article = await Article.findByIdAndDelete(_id);
    if (!article) {
      throw new APIError(404, "Article not found");
    }
    return article;
  } catch (error) {
    throw error;
  }
};

const getUsersArticleById = async (_id: string) => {
  try {
    const article = await Article.findById(_id).populate("category");
    if (!article) {
      throw new APIError(404, "Article not found");
    }
    if (article.status !== "published") {
      throw new APIError(403, "Forbidden");
    }
    return article;
  } catch (error) {
    throw error;
  }
};

const allArticles = async (req: IUserRequest) => {
  const sortby = req.query.sortby || "_id";
  const order = req.query.order || "desc";
  const limit = req.query.limit || 2;

  try {
    const articles = await Article.find({ status: "published" })
      .populate("category")
      .sort([[sortby, order]])
      .limit(limit);
    return articles;
  } catch (error) {
    throw error;
  }
};

const moreArticles = async (req: IUserRequest) => {
  const sortby = req.body.sortby || "_id";
  const order = req.body.order || "desc";
  const limit = req.body.limit || 2;
  const skip = req.body.skip || 0;

  try {
    const articles = await Article.find({ status: "published" })
      .populate("category")
      .sort([[sortby, order]])
      .skip(skip)
      .limit(limit);
    return articles;
  } catch (error) {
    throw error;
  }
};

const paginateAdminArticles = async (req: IUserRequest) => {
  try {
    let aggQueryArray = [];
    if (req.body.keyword && req.body.keyword !== "") {
      const re = new RegExp(`${req.body.keyword}`, "gi");
      aggQueryArray.push({
        $match: {
          title: { $regex: re },
        },
      });
    }

    // Categories
    aggQueryArray.push(
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },
      { $unwind: "$category" }
    );

    const aggQuery = Article.aggregate(aggQueryArray);
    const limit = req.body.limit || 5;
    const options = {
      page: req.body.page || 1,
      limit: limit,
      sort: { _id: "desc" },
    };
    const articles = await Article.aggregatePaginate(aggQuery, options);
    return articles;
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
  deleteArticleById,
  getUsersArticleById,
  allArticles,
  moreArticles,
  paginateAdminArticles,
  addCategory,
  findAllCategories,
};
