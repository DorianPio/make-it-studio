import { models } from "../../models/index";
const {
  AuthenticationError,
  ForbiddenError,
} = require("apollo-server-express");

export const getAllOffices = async (args, { user }) => {
  const userFind = await models.User.findById(user.id);
  if (!userFind) {
    throw new AuthenticationError("You need to login");
  }
  if (userFind.username != "admin") {
    throw new ForbiddenError("You're not allowed to do this !");
  }
  const offices = await models.Office.find({}).exec();
  return offices;
};

export const getMyOffices = async ({ filter }, { user }) => {
  const userFind = await models.User.findById(user.id);
  if (!userFind) {
    throw new AuthenticationError("You need to login");
  }
  if (!filter) {
    return await models.Office.find({ bookedBy: userFind.username });
  }
  const offices = await models.Office.find({
    bookedBy: userFind.username,
    place: filter,
  });
  return offices;
};

export const getOfficeAvailable = async (args) => {
  const offices = await models.Office.find({ booked: false }).exec();

  return offices;
};
