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
    size: Int!
    booked: Boolean
    bookedBy: String
    place: String!
    nameOfOffice: String!
  }

  type Filter {
    cars: Cars
    offices: Offices
  }

  type Query {
    me: User
    listAllCars: [Cars]
    listCarAvailable: [Cars]
    listMyBooksCars(filter: String): [Cars]
    listAllOffices: [Offices]
    listOfficeAvailable: [Offices]
    listMyBooksOffices(filter: String): [Offices]
  }

  type Mutation {
    addOffice(size: Int!, place: String!, nameOfOffice: String!): String!
    bookAnOffice(nameOfOffice: String!): String!
    bookedACar(typeOfCar: String!): String!
    addCars(typeOfCar: String): String!
    register(username: String!, email: String!, password: String!): String!
    login(username: String!, email: String!, password: String!): String!
  }
`;
