const { gql } = require("apollo-server");

export const typeDefs = gql`
  type User {
    username: String!
    email: String!
    password: String!
  }
  type Cars {
    typeOfCar: String
    booked: Boolean
    bookedBy: String
  }
  type Offices {
    Size: Int!
    booked: Boolean
    bookedBy: String
  }
  type Query {
    me: User
    listAllCars: [Cars]
    listCarAvailable: [Cars]
    listMyBooks: [Cars]
  }
  type Mutation {
    bookedACar(typeOfCar: String!): String!
    addCars(typeOfCar: String): String!
    register(username: String!, email: String!, password: String!): String!
    login(username: String!, email: String!, password: String!): String!
  }
`;
