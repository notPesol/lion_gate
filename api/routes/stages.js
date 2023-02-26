const express = require("express");
const router = express.Router();
const Stage = require("../models/Stage");

// Get Stage List
router.get("/", async (req, res, next) => {
  const response = { ok: true };
  try {
    const result = await Stage.find().exec();
    response.payload = result;
  } catch (error) {
    response.ok = false;
    response.message = error.message;
  }

  res.json(response);
});

// Get Stage By Id
router.get("/:id", async (req, res, next) => {
  const response = { ok: true };
  const { id } = req.params;
  try {
    const result = await Stage.findById(id).exec();
    if (!result) {
      throw new Error(`Stage not found!, id: ${id}`);
    }
    response.payload = result;
  } catch (error) {
    response.ok = false;
    response.message = error.message;
  }

  res.json(response);
});

// Create Stage
router.post("/", async (req, res, next) => {
  const response = { ok: true };

  try {
    const newStage = new Stage(req.body);
    await newStage.save();
    response.payload = newStage;
  } catch (error) {
    response.ok = false;
    response.message = error.message;
  }

  res.json(response);
});

// Update Stage By Id
router.put("/:id", async (req, res, next) => {
  const response = { ok: true };
  const { id } = req.params;
  try {
    const animal = await Stage.findByIdAndUpdate(id, req.body);
    if (!animal) {
      throw new Error(`Stage not found!, id: ${id}`);
    }
    response.payload = animal;
  } catch (error) {
    response.ok = false;
    response.message = error.message;
  }

  res.json(response);
});

// Delete Stage By Id
router.delete("/:id", async (req, res, next) => {
  const response = { ok: true };
  const { id } = req.params;
  try {
    const animal = await Stage.findByIdAndDelete(id, req.body);
    if (!animal) {
      throw new Error(`Stage not found!, id: ${id}`);
    }
    response.payload = animal;
  } catch (error) {
    response.ok = false;
    response.message = error.message;
  }

  res.json(response);
});

module.exports = router;
