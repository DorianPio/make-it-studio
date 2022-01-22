const db = require("mongoose");

const OfficeScheme = new db.Schema({
  size: {
    type: Number,
    required: true,
  },
  booked: {
    type: Boolean,
    required: true,
  },
  bookedBy: {
    type: String,
    nulleable: true,
  },
  place: {
    type: String,
    required: true,
  },
  nameOfOffice: {
    type: String,
    required: true,
  },
});

export const Office = db.model("Office", OfficeScheme);
// size: Int!;
// booked: Boolean;
// bookedBy: String;
// place: String!;
// nameOfOffice: String!;
