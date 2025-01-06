import { User } from "../models/user";
const { APIError } = require("../middleware/apiError");
const { status } = require("http-status");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const findUserByEmail = async (email: string) => {
  return await User.findOne({ email });
};

const findUserById = async (id: string) => {
  return await User.findById(id);
};

const updateUserProfile = async (req: any) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.user._id },
      {
        $set: {
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          age: req.body.age,
        },
      },
      { new: true }
    );
    if (!user) {
      throw new APIError(status.NOT_FOUND, "User not found");
    }
    return user;
  } catch (error) {
    throw error;
  }
};

const updateUserEmail = async (req: any) => {
  try {
    if (await User.emailTaken(req.body.newemail)) {
      throw new APIError(status.CONFLICT, "Email already taken");
    }
    const user = await User.findOneAndUpdate(
      { _id: req.user._id, email: req.user.email },
      {
        $set: {
          email: req.body.newemail,
          verified: false,
        },
      },
      { new: true }
    );
    if (!user) {
      throw new APIError(status.NOT_FOUND, "User not found");
    }
    return user;
  } catch (error) {
    throw error;
  }
};

const validateToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = {
  findUserByEmail,
  findUserById,
  updateUserProfile,
  updateUserEmail,
  validateToken,
};
