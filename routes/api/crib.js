const express = require("express");
const router = express.Router();
var cribData = require("../../data/apiData");
const redis = require("redis");
const client = redis.createClient({
  port: 6379,
});

const cribInputValidate = require("../../validation/cribInputValidate");

client
  .connect()
  .then(() => console.log("Successfully connected to the redis client"))
  .catch((err) => console.error("Error connecting to the client."));

//Get all cribs
router.get("/cribs", async (req, res) => {
  const cribs = await client.get("Cribs");
  if (cribs) {
    return res.status(200).json(JSON.parse(cribs));
  } else {
    await client.setEx("Cribs", 5, JSON.stringify(cribData));
    return res.status(200).json(cribData);
  }
});

//Gets crib with the id passed as parameter
router.get("/cribs/:id", async (req, res) => {
  //Check if crib with the id already exists in Redis
  const cribId = await client.get("Cribs" + req.params.id);

  if (cribId) {
    return res.status(200).json(JSON.parse(cribId));
  }
  //Check if crib with the id exists
  const cribWithId = cribData.filter((e) => e.id === Number(req.params.id));

  if (cribWithId.length > 0) {
    await client.setEx(
      "Cribs" + req.params.id,
      120,
      JSON.stringify(cribWithId)
    );
    return res.status(200).json(cribWithId);
  }
  return res.status(404).json(`Crib with id ${req.params.id} not found`);
});

//Add a crib to cribData
router.post("/cribs", async (req, res) => {
  //Validate request body if there is any null value
  const { errors, isValid } = cribInputValidate(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const newCrib = {
    id: cribData.length + 1,
    name: req.body.name,
    img: req.body.img,
    location: req.body.location,
  };

  cribData.push(newCrib);

  return res.status(201).json(cribData);
});

//Updates crib with id
router.put("/cribs/:id", async (req, res) => {
  //Check if crib with the id exists
  const cribWithId = cribData.findIndex((e) => e.id === Number(req.params.id));

  if (cribWithId >= 0) {
    //Validate request body if there is any null value
    const { errors, isValid } = cribInputValidate(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    cribData[cribWithId].name = req.body.name;

    cribData[cribWithId].img = req.body.img;

    cribData[cribWithId].location = req.body.location;

    return res.status(200).json(cribData);
  }

  return res.status(404).json(`Crib with id ${req.params.id} not found`);
});

//Deletes crib with id
router.delete("/cribs/:id", async (req, res) => {
  //Check whether id exists in Redis already. If yes, then delete it.
  const cribId = await client.get("Cribs" + req.params.id);

  if (cribId) {
    await client.del("Cribs" + req.params.id);
  }

  //Check whether the crib with id exists
  const cribWithId = cribData.findIndex((e) => e.id === Number(req.params.id));

  if (cribWithId >= 0) {
    cribData.splice(cribWithId, 1);

    return res.status(200).json(cribData);
  }

  return res.status(404).json(`Crib with id ${req.params.id} not found`);
});

module.exports = router;
