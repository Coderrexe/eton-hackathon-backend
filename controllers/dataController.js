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
  User.findOne({ username: "prototype" }, (err, userFound) => {
    if (!err) {
      if (userFound) {
        res.status(200).json({
          username: userFound.username,
          roomNumber: userFound.roomNumber,
          targetTemperature: userFound.targetTemperature,
        });
      } else {
        res.status(404).json("No such user found.");
      }
    } else {
      res.send(err);
    }
  });
}

async function updateCurrentTemperature(req, res) {
  const currentTemperature = req.body.currentTemperature;
  User.findOneAndUpdate(
    { username: "prototype" },
    { currentTemperature: currentTemperature }
  ).then((user) => {
    res
      .status(200)
      .json(
        "Successfully saved new user. Current temperature: " +
          user.currentTemperature
      );
  });
}

async function getCurrentTemperature(req, res) {
  User.findOne({ username: "prototype" }, (err, userFound) => {
    if (!err) {
      if (userFound) {
        res.status(200).json({
          username: userFound.username,
          roomNumber: userFound.roomNumber,
          targetTemperature: userFound.targetTemperature,
          currentTemperature: userFound.currentTemperature,
        });
      } else {
        res.status(404).json("No such user found.");
      }
    } else {
      res.send(err);
    }
  });
}

module.exports = {
  storeInitialData,
  getInitialData,
  updateCurrentTemperature,
  getCurrentTemperature,
};
