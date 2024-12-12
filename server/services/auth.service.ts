import { User } from "../models/user";
const userService = require("./user.service");
const { status } = require("http-status");
const { APIError } = require("../middleware/apiError");

const createUser = async (email: string, password: string) => {
  try {
    if (await User.emailTaken(email)) {
      throw new APIError(status.BAD_REQUEST, "Email already taken");
    }
    const user = new User({ email, password });
    await user.save();
    return user;
  } catch (error) {
    throw error;
  }
};

const genAuthToken = (user: { generateAuthToken: () => any }) => {
  const token = user.generateAuthToken();
  return token;
};

const signInWithEmailAndPassword = async (email: string, password: string) => {
  try {
    const user = await userService.findUserByEmail(email);
    if (!user) {
      throw new APIError(status.BAD_REQUEST, "User not found");
    }
    if (!(await user.comparePassword(password))) {
      throw new APIError(status.BAD_REQUEST, "Invalid password");
    }
    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createUser,
  genAuthToken,
  signInWithEmailAndPassword,
};
