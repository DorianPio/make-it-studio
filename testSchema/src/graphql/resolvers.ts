import { getUsers } from "../utils";
import { models } from "../models/index";

const {
  AuthenticationError,
  ForbiddenError,
} = require("apollo-server-express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

export const resolvers = {
  Query: {
    me: async (_, args, { user }) => {
      if (!user) {
        throw new Error("You're not authenticated !");
      }
      return await models.User.findById(user.id);
    },

    listAllCars: async (_, args, { user }) => {
      const userFind = await models.User.findById(user.id);
      if (userFind.username != "admin") {
        throw new ForbiddenError("You're not allowed to do this !");
      }
      return await models.Car.find({}).exec();
    },

    listCarAvailable: async (_, args) => {
      const cars = await models.Car.find({ booked: false }).exec();
      if (!cars) {
        throw new Error("No cars were found!");
      }
      return cars;
    },

    listMyBooks: async (_, args, { user }) => {
      const userFind = await models.User.findById(user.id);
      const cars = await models.Car.find({ bookedBy: userFind.username });
      return cars;
    },
  },
  Mutation: {
    /**********************************************************
     *                                                        *
     *                                                        *
     *                  UserManagement                        *
     *                                                        *
     *                                                        *
     *********************************************************/

    register: async (_, { username, email, password }) => {
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
        console.log(err);
        throw new Error("Error creating account");
      }
    },
    login: async (_, { username, email, password }) => {
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
    },
    /**********************************************************
     *                                                        *
     *                                                        *
     *                  CarsManagement                        *
     *                                                        *
     *                                                        *
     *********************************************************/

    addCars: async (_, { typeOfCar }, { user }) => {
      if (typeOfCar) {
        typeOfCar = typeOfCar.toLowerCase();
      } else {
        typeOfCar = "basic car";
      }
      const userFind = await models.User.findById(user.id);
      if (userFind.username != "admin") {
        throw new ForbiddenError("You're not allowed to do this !");
      }
      try {
        const cars = await models.Car.create({
          typeOfCar: typeOfCar,
          booked: false,
          bookedBy: null,
        });
        return "Car created successfully !";
      } catch (err) {
        throw new Error("Something went wrong");
      }
    },

    bookedACar: async (_, { typeOfCar }, { user }) => {
      const userFind = await models.User.findById(user.id);
      const query = { typeOfCar: typeOfCar, booked: false };
      const changement = { booked: true, bookedBy: userFind.username };

      const car = await models.Car.findOneAndUpdate(query, {
        $set: changement,
      });
      if (car) {
        return "Booked successfully";
      }
      return "This car doesn't exist";
    },
  },
};
