import { models } from "../../models/index";

const {
  AuthenticationError,
  ForbiddenError,
} = require("apollo-server-express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

export const registerNewUser = async ({ username, email, password }) => {
  email = email.trim().toLowerCase();
  const hashed = await bcrypt.hash(password, 10);

  try {
    const user = await models.User.create({
      username,
      email,
      password: hashed,
    });
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  } catch (err) {
    throw new Error("Error creating account");
  }
};
export const loginUser = async ({ username, email, password }) => {
  if (email) {
    email = email.trim().toLowerCase();
  }
  const user = await models.User.findOne({
    $or: [{ email }, { username }],
  });
  if (!user) {
    throw new AuthenticationError("Error user does not exist");
  }
  const valid = bcrypt.compare(password, user.password);
  if (!valid) {
    throw new AuthenticationError("Error signing in");
  }
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET);
};

export const whoiam = async (args, { user }) => {
  if (!user) {
    throw new Error("You're not authenticated !");
  }
  return await models.User.findById(user.id);
};
