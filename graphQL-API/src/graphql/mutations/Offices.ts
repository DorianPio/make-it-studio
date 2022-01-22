import { models } from "../../models/index";
const {
  AuthenticationError,
  ForbiddenError,
} = require("apollo-server-express");

export const createOffices = async (
  { size, place, nameOfOffice },
  { user }
) => {
  nameOfOffice = nameOfOffice.toLowerCase();
  place = place.toLowerCase();
  const userFind = await models.User.findById(user.id);

  if (!userFind) {
    throw new AuthenticationError("You need to login");
  }
  if (userFind.username != "admin") {
    throw new ForbiddenError("You're not allowed to do this !");
  }
  try {
    const office = await models.Office.create({
      size: size,
      booked: false,
      bookedBy: null,
      place: place,
      nameOfOffice: nameOfOffice,
    });
    return "Office created successfully !";
  } catch (err) {
    throw new Error("Something went wrong: " + err);
  }
};

export const bookOffice = async ({ nameOfOffice }, { user }) => {
  const userFind = await models.User.findById(user.id);
  if (!userFind) {
    throw new AuthenticationError("You need to login");
  }
  const query = { nameOfOffice: nameOfOffice, booked: false };
  const changement = { booked: true, bookedBy: userFind.username };

  const office = await models.Office.findOneAndUpdate(query, {
    $set: changement,
  });
  if (office) {
    return "Book this office successfully";
  }
  return "This office doesn't exist";
};
