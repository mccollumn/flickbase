import mongoose, { Schema, Document, Model } from "mongoose";
require("dotenv").config();

const articleSchema = new Schema({
  title: {
    type: String,
    required: [true, "Please provide a title"],
    maxLength: 100,
  },
  content: {
    type: String,
    required: [true, "Please provide content"],
  },
  excerpt: {
    type: String,
    required: [true, "Please provide excerpt"],
    kMaxLength: 500,
  },
  score: {
    type: Number,
    required: [true, "Please provide a score"],
    min: 0,
    max: 100,
  },
  director: {
    type: String,
    required: [true, "Please provide a director"],
  },
  actors: {
    type: [String],
    required: [true, "Please provide actors"],
    validate: {
      validator: (v: string[]) => v.length > 0,
      message: "Please provide at least one actor",
    },
  },
  status: {
    type: String,
    required: true,
    enum: ["published", "draft"],
    default: "draft",
    index: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: [true, "Please provide a category"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Article = mongoose.model("Article", articleSchema);

module.exports = { Article };
