import { models } from "../../models/index";
const {
  AuthenticationError,
  ForbiddenError,
} = require("apollo-server-express");

export const getAllCars = async (args, { user }) => {
  const userFind = await models.User.findById(user.id);
  if (!userFind) {
    throw new AuthenticationError("You need to login");
  }
  if (userFind.username != "admin") {
    throw new ForbiddenError("You're not allowed to do this !");
  }
  const cars = await models.Car.find({}).exec();
  return cars;
};

export const getMyCars = async ({ filter }, { user }) => {
  const userFind = await models.User.findById(user.id);
  if (!userFind) {
    throw new AuthenticationError("You need to login");
  }
  if (!filter) {
    return await models.Car.find({ bookedBy: userFind.username });
  }
  const cars = await models.Car.find({
    bookedBy: userFind.username,
    typeOfCar: filter,
  });
  return cars;
};

export const getCarAvailable = async (args) => {
  const cars = await models.Car.find({ booked: false }).exec();

  return cars;
};
