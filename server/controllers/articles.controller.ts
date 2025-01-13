import { Request, Response } from "express";
const { status } = require("http-status");
const { articlesService } = require("../services");

const articlesController = {
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
