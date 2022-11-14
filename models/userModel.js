const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  roomNumber: {
    type: Number,
    required: true,
  },
  targetTemperature: {
    type: Number,
    required: true,
  },
  currentTemperature: {
    type: Number,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = {
  User,
  userSchema,
};
