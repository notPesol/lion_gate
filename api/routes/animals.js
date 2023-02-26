const express = require("express");
const router = express.Router();
const Animal = require("../models/Animal");

// Get Animal List
router.get("/", async (req, res, next) => {
  const response = { ok: true };
  try {
    const result = await Animal.find().populate({ path: "animalType" }).exec();
    response.payload = result;
  } catch (error) {
    response.ok = false;
    response.message = error.message;
  }

  res.json(response);
});

// Get Animal By Id
router.get("/:id", async (req, res, next) => {
  const response = { ok: true };
  try {
    const result = await Animal.findById(req.params.id)
      .populate({ path: "animalType" })
      .exec();
    response.payload = result;
  } catch (error) {
    response.ok = false;
    response.message = error.message;
  }

  res.json(response);
});

// Create Animal
router.post("/", async (req, res, next) => {
  const response = { ok: true };

  try {
    const newAnimal = new Animal(req.body);
    await newAnimal.save();
    response.payload = newAnimal;
  } catch (error) {
    response.ok = false;
    response.message = error.message;
  }

  res.json(response);
});

// Update Animal By Id
router.put("/:id", async (req, res, next) => {
  const response = { ok: true };
  const {id} = req.params;
  try {
    const animal = await Animal.findByIdAndUpdate(id, req.body);
    if (!animal) {
      throw new Error(`Animal not found!, id: ${id}`)
    }
    response.payload = animal;
  } catch (error) {
    response.ok = false;
    response.message = error.message;
  }

  res.json(response);
});

// Delete Animal By Id
router.delete("/:id", async (req, res, next) => {
  const response = { ok: true };
  const {id} = req.params;
  try {
    const animal = await Animal.findByIdAndDelete(id, req.body);
    if (!animal) {
      throw new Error(`Animal not found!, id: ${id}`)
    }
    response.payload = animal;
  } catch (error) {
    response.ok = false;
    response.message = error.message;
  }

  res.json(response);
});

module.exports = router;
