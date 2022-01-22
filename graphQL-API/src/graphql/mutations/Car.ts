import { models } from "../../models/index";
const {
  AuthenticationError,
  ForbiddenError,
} = require("apollo-server-express");

export const createCars = async ({ typeOfCar }, { user }) => {
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
};

export const bookCar = async ({ typeOfCar }, { user }) => {
  const userFind = await models.User.findById(user.id);
  const query = { typeOfCar: typeOfCar, booked: false };
  const changement = { booked: true, bookedBy: userFind.username };

  const car = await models.Car.findOneAndUpdate(query, {
    $set: changement,
  });
  if (car) {
    return "Book this car successfully";
  }
  return "This car doesn't exist";
};
