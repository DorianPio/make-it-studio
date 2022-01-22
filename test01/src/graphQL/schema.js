const graphQL = require("graphql-tag");

module.exports = graphQL`
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }
  type Query {
    user: [User]
  }
  type Mutation {
    signUp(username: String!, email: String!, password: String!): String!
    signIn(username: String!, password: String!): String!
  }
`;
