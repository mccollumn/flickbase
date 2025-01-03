import mongoose, { Schema, Document, Model } from "mongoose";
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

export interface IUser {
  _id: unknown;
  email?: string;
  password?: string;
  role?: string;
  firstname?: string;
  lastname?: string;
  age?: number;
  date?: Date;
  verified?: boolean;
}

export interface IUserRequest extends Request {
  user: IUser;
}

interface IUserModel extends Model<IUser> {
  emailTaken(email: string): Promise<boolean>;
  generateAuthToken(): string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema: Schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate(value: string) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email");
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  firstname: {
    type: String,
    trim: true,
    maxLength: 100,
  },
  lastname: {
    type: String,
    trim: true,
    maxLength: 100,
  },
  age: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  verified: {
    type: Boolean,
    default: false,
  },
});

userSchema.pre("save", async function (next: any) {
  const user = this;
  if (user.isModified("password")) {
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
  }
  next();
});

userSchema.statics.emailTaken = async function (email: string) {
  const user = await this.findOne({ email });
  return !!user;
};

userSchema.methods.generateAuthToken = function () {
  const user = this;
  const userObj = { sub: user._id.toHexString(), email: user.email };
  const token = jwt.sign(userObj, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  return token;
};

userSchema.methods.generateEmailVerificationToken = function () {
  const user = this;
  const userObj = { sub: user._id.toHexString() };
  const token = jwt.sign(userObj, process.env.JWT_SECRET, {
    expiresIn: "10h",
  });
  return token;
};

userSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  const user = this;
  const match = await bcrypt.compare(candidatePassword, user.password);
  return match;
};

export const User: IUserModel = mongoose.model<IUser, IUserModel>(
  "User",
  userSchema
);
