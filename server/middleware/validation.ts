import { Request, Response, NextFunction } from "express";
const { check, validationResult } = require("express-validator");
const { status } = require("http-status");

const addArticleValidator = [
  check("title")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Add a title")
    .bail()
    .isLength({ min: 3 })
    .withMessage("Title should be at least 3 characters"),
  check("content")
    .isLength({ min: 10 })
    .withMessage("Content should be at least 10 characters"),
  check("excerpt")
    .isLength({ min: 20 })
    .withMessage("Excerpt should be at least 20 characters"),
  check("score")
    .isInt({ min: 0, max: 100 })
    .withMessage("Score should be between 0 and 100"),
  check("director")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Add a director")
    .bail()
    .not()
    .isBoolean()
    .withMessage("Director should be a string")
    .bail()
    .isLength({ min: 3, mas: 100 })
    .withMessage("Director should be at least 3 characters"),
  check("actors")
    .isArray({ min: 1 })
    .withMessage("Please provide at least one actor"),
  check("status")
    .isIn(["published", "draft"])
    .withMessage("Status should be either published or draft"),
  check("category").isMongoId(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(status.BAD_REQUEST).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = {
  addArticleValidator,
};
