import { Request, Response } from "express";
const { status } = require("http-status");
const { articlesService } = require("../services");
import { IUserRequest } from "../models/user";

const articlesController = {
  async createArticle(req: Request, res: Response, next: any) {
    try {
      const article = await articlesService.addArticle(req.body);
      res.json(article);
    } catch (error) {
      next(error);
    }
  },
  async getArticleById(req: IUserRequest, res: Response, next: any) {
    try {
      const _id = req.params.id;
      const article = await articlesService.getArticleById(_id, req.user);
      res.json(article);
    } catch (error) {
      next(error);
    }
  },
  async updateArticleById(req: IUserRequest, res: Response, next: any) {
    try {
      const _id = req.params.id;
      const article = await articlesService.updateArticleById(_id, req.body);
      res.json(article);
    } catch (error) {
      next(error);
    }
  },
  async deleteArticleById(req: IUserRequest, res: Response, next: any) {
    try {
      const _id = req.params.id;
      await articlesService.deleteArticleById(_id);
      res.status(status.OK).json({ message: "Article deleted" });
    } catch (error) {
      next(error);
    }
  },
  async createCategory(req: Request, res: Response, next: any) {
    try {
      const category = await articlesService.addCategory(req.body);
      res.json(category);
    } catch (error) {
      next(error);
    }
  },
  async getCategories(req: Request, res: Response, next: any) {
    try {
      const categories = await articlesService.findAllCategories();
      res.json(categories);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = articlesController;
