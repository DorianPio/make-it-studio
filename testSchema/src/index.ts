import { ApolloServer } from "apollo-server";
import { typeDefs } from "./graphql/schema";
import { resolvers } from "./graphql/resolvers";
import { models } from "./models/index";
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const checkUser = (token) => {
  if (token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      throw new Error("Session Invalid");
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization;
    const user = checkUser(token);
    console.log(user);
    return { models, user };
  },
});

mongoose
  .connect(process.env.MONGODB_URL, { useNewUrlParser: true })
  .then(() => {
    console.log("MongoDB Connected");
    return server.listen({ port: 4000 });
  })
  .then(({ url }: { url: string }) => {
    console.log(`Server running at ${url}`);
  });
