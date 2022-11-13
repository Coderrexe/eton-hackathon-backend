const express = require("express");
const {
  storeInitialData,
  getInitialData,
  updateCurrentTemperature,
  getCurrentTemperature,
} = require("../controllers/dataController");

const router = express.Router();

router.post("/store-initial-data", storeInitialData);

router.get("/get-initial-data", getInitialData);

router.post("/update-current-temperature", updateCurrentTemperature);

router.get("/get-current-temperature", getCurrentTemperature);

module.exports = router;
