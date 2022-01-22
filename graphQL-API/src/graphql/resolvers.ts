import {
  getAllOffices,
  getOfficeAvailable,
  getMyOffices,
} from "./query/Offices";
import { getAllCars, getCarAvailable, getMyCars } from "./query/Cars";
import { bookOffice, createOffices } from "./mutations/Offices";
import { loginUser, registerNewUser, whoiam } from "./mutations/User";
import { bookCar, createCars } from "./mutations/Car";
import { filterSearch } from "./mutations/Filter";
import { models } from "../models/index";

const {
  AuthenticationError,
  ForbiddenError,
} = require("apollo-server-express");

export const resolvers = {
  Query: {
    me: async (_, args, { user }) => whoiam(args, { user }),

    listAllCars: async (_, args, { user }) => getAllCars(args, { user }),

    listCarAvailable: async (_, args) => getCarAvailable(args),

    listMyBooksCars: async (_, { filter }, { user }) =>
      getMyCars({ filter }, { user }),

    listAllOffices: async (_, args, { user }) => getAllOffices(args, { user }),

    listOfficeAvailable: async (_, args, { user }) => getOfficeAvailable(args),

    listMyBooksOffices: async (_, { filter }, { user }) =>
      getMyOffices({ filter }, { user }),
  },
  Mutation: {
    /**********************************************************
     *                                                        *
     *                                                        *
     *                  UserManagement                        *
     *                                                        *
     *                                                        *
     *********************************************************/

    register: async (_, { username, email, password }) =>
      registerNewUser({ username, email, password }),

    login: async (_, { username, email, password }) =>
      loginUser({ username, email, password }),
    /**********************************************************
     *                                                        *
     *                                                        *
     *                  CarsManagement                        *
     *                                                        *
     *                                                        *
     *********************************************************/

    addCars: async (_, { typeOfCar }, { user }) =>
      createCars({ typeOfCar }, { user }),

    bookedACar: async (_, { typeOfCar }, { user }) =>
      bookCar({ typeOfCar }, { user }),
    /**********************************************************
     *                                                        *
     *                                                        *
     *                  OfficeManagement                      *
     *                                                        *
     *                                                        *
     *********************************************************/

    addOffice: async (_, { size, place, nameOfOffice }, { user }) =>
      createOffices({ size, place, nameOfOffice }, { user }),
    bookAnOffice: async (_, { nameOfOffice }, { user }) =>
      bookOffice({ nameOfOffice }, { user }),
  },
};
