const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");

const resolvers = require("./graphQL/resolvers/mutations.ts");
const schema = require("./graphQL/schema");

require("dotenv").config();

const server = new ApolloServer({
  schema,
  resolvers,
});

mongoose
  .connect(process.env.MONGODB_URL, { useNewUrlParser: true })
  .then(() => {
    console.log("MongoDB Connected");
    return server.listen({ port: 5000 });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  });
// connectDb();
