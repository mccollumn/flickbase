// const httpStatus = require("http-status");
const User = require("../models/user");

const createUser = async (email: string, password: string) => {
  try {
    console.log(User);
    if (await User.emailTaken(email)) {
      throw new Error("Email already taken");
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

module.exports = {
  createUser,
  genAuthToken,
};
