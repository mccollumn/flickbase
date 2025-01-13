import mongoose, { Schema, Document, Model } from "mongoose";
require("dotenv").config();

const categorySchema: Schema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, "Category name is required"],
    trim: true,
    lowercase: true,
    maxLength: 100,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Category = mongoose.model("Category", categorySchema);

module.exports = { Category };
