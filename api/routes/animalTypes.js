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

// Delete Animal Type By Id
router.delete("/:id", async (req, res, next) => {
  const response = { ok: true };
  const {id} = req.params;
  try {
    const animalType = await AnimalType.findByIdAndDelete(id);
    if (!animalType) {
      throw new Error(`Animal type not found!, id: ${id}`)
    }
    response.payload = animalType
  } catch (error) {
    response.ok = false;
    response.message = error.message;
  }

  res.json(response);
});

module.exports = router;
