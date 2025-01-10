const { Category } = require("../models/category");
const { APIError } = require("../middleware/apiError");

const addCategory = async (body: Body) => {
  try {
    const category = new Category({ ...body });
    await category.save();
    return category;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addCategory,
};
