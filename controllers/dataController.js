const { User } = require("../models/userModel");

async function storeInitialData(req, res) {
  const username = req.body.username;
  const roomNumber = req.body.roomNumber;
  const targetTemperature = req.body.targetTemperature;

  // Store to database.
  const user = new User({
    username: username,
    roomNumber: roomNumber,
    targetTemperature: targetTemperature,
  });

  try {
    user.save();
    res.status(200).json("Successfully saved new user");
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function getInitialData(req, res) {
  // Retrieve data from database.
}

async function updateCurrentTemperature(req, res) {
  const currentTemperature = req.body.currentTemperature;
  // Store to database.
}

async function getCurrentTemperature(req, res) {
  // Retrieve data from database.
}

module.exports = {
  storeInitialData,
  getInitialData,
  updateCurrentTemperature,
  getCurrentTemperature,
};
