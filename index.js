const express = require("express");
const app = express();
const cors = require("cors");
const crib = require("./routes/api/crib");

const port = process.env.PORT || 3000;

require("dotenv").config();

app.use(cors());

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/api", crib);

app.use(function (req, res) {
  res.status(404).send("404:Page Not Found.");
});

app.listen(port, (err) => {
  if (err) {
    console.error("Error connecting to the port");
    return;
  }
  console.log("Started listening to the port");
});
