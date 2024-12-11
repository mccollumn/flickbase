import { User } from "../models/user";

const findUserByEmail = async (email: string) => {
  return await User.findOne({ email });
};

module.exports = {
  findUserByEmail,
};
