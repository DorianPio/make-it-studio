const db = require("mongoose");

const CarScheme = new db.Schema({
  typeOfCar: {
    type: String,
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
});

export const Car = db.model("Car", CarScheme);
