const express = require("express");
const router = express.Router();
const AnimalType = require("../models/AnimalType");

// Get Animal Type List
router.get("/", async (req, res, next) => {
  const response = { ok: true };
  try {
    const result = await AnimalType.find().exec();
    response.payload = result;
  } catch (error) {
    response.ok = false;
    response.message = error.message;
  }

  res.json(response);
});

// Create Animal Type
router.post("/", async (req, res, next) => {
  const response = { ok: true };

  try {
    const newAnimalType = new AnimalType(req.body);
    await newAnimalType.save();
    response.payload = newAnimalType
  } catch (error) {
    response.ok = false;
    response.message = error.message;
  }

  res.json(response);
});

module.exports = router;
