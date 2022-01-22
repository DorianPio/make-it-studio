const db = require("mongoose");

const UserSchema = new db.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      index: { unique: true },
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamp: true,
  }
);

export const User = db.model("User", UserSchema);
