// imports

const express = require("express");
const cors = require("cors");
const locationRoutes = require("./routes/location");

// configuration
const app = express();
const corsOptions = {
  origin: "http://127.0.0.1:5500",
  optionsSuccessStatus: 200,
};

// // middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsOptions));

// routes
app.use(locationRoutes);

// test
app.use("/hello", (req, res, next) => {
  res.json("hello world");
});

app.listen(3000, function (err) {
  console.log("Server listening on Port", 3000);
});
