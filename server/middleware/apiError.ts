import { Request, Response } from "express";
const mongoose = require("mongoose");
const { status } = require("http-status");

class APIError extends Error {
  statusCode: number;
  message: string;
  constructor(statusCode: number, message: string) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

const handleError = (err: any, res: Response) => {
  const { statusCode, message } = err;
  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
  });
};

const convertToAPIError = (
  err: any,
  req: Request,
  res: Response,
  next: any
) => {
  let error = err;
  if (!(error instanceof APIError)) {
    const statusCode =
      error.statusCode || error instanceof mongoose.Error
        ? status.BAD_REQUEST
        : status.INTERNAL_SERVER_ERROR;
    const message = error.message || status[statusCode];
    error = new APIError(statusCode, message);
  }
  next(error);
};

module.exports = {
  APIError,
  handleError,
  convertToAPIError,
};
