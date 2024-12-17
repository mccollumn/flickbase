import { User } from "../models/user";

const findUserByEmail = async (email: string) => {
  return await User.findOne({ email });
};

const findUserById = async (id: string) => {
  return await User.findById(id);
};

module.exports = {
  findUserByEmail,
  findUserById,
};
