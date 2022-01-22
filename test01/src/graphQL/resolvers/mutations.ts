const { model } = require("../../models/user.ts");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  AuthenticationError,
  ForbiddenError,
} = require("apollo-server-express");

const resolver = {
  signUp: async (_, { username, email, password }, { model }) => {
    email = email.trim().toLowerCase();

    const hashed = await bcrypt.hash(password, 10);

    try {
      const user = await model.User.create({
        username,
        email,
        password: hashed,
      });
      return jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    } catch (err) {
      console.log(err);
      throw new Error("Error creating account");
    }
  },
};

module.exports = resolver;
