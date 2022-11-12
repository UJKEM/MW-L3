"use strict";

var express = require("express");

var app = express();

var cors = require("cors");

var crib = require("./routes/api/crib");

var port = process.env.PORT || 3000;

require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use("/api", crib);
app.use(function (req, res) {
  res.status(404).send("404:Page Not Found.");
});
app.listen(port, function (err) {
  if (err) {
    console.error("Error connecting to the port");
    return;
  }

  console.log("Started listening to the port");
});