const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dataRoutes = require("./routes/dataRoutes");

const app = express();

// Allow requests to be sent from the website domain, thus disabling
// CORS No "Access-Control-Allow-Origin" header error.
app.use(
  cors({
    origin: "*",
  })
);

// Parse incoming JSON requests and put the parsed data in req.body
// For POST, PUT, PATCH. Not for GET and DELETE.
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api/data", dataRoutes);

mongoose
  .connect(
    "mongodb+srv://simbashi:8KQOR4i4zzr6o00z@cluster0.vlyf9nf.mongodb.net/hackathonDB"
  )
  .then(() => {
    console.log("Connected to database.");
    const port = process.env.PORT || 8080;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}.`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
