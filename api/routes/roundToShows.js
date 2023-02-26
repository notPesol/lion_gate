const express = require("express");
const router = express.Router();
const RoundToShow = require("../models/RoundToShow");

// Get Row To Show List
router.get("/", async (req, res, next) => {
  const response = { ok: true };
  try {
    const result = await RoundToShow.find()
      .populate([{ path: "animal" }, { path: "stage" }])
      .exec();
    response.payload = result;
  } catch (error) {
    response.ok = false;
    response.message = error.message;
  }

  res.json(response);
});

// Get Round To Show By Id
router.get("/:id", async (req, res, next) => {
  const response = { ok: true };
  const { id } = req.params;
  try {
    const result = await RoundToShow.findById(id)
      .populate([{ path: "animal" }, { path: "stage" }])
      .exec();
    if (!result) {
      throw new Error(`Round To Show not found!, id: ${id}`);
    }
    response.payload = result;
  } catch (error) {
    response.ok = false;
    response.message = error.message;
  }

  res.json(response);
});

// Create Round To Show
router.post("/", async (req, res, next) => {
  const response = { ok: true };

  try {
    const newStage = new RoundToShow(req.body);
    await newStage.save();
    response.payload = newStage;
  } catch (error) {
    response.ok = false;
    response.message = error.message;
  }

  res.json(response);
});

// Update Round To Show By Id
router.put("/:id", async (req, res, next) => {
  const response = { ok: true };
  const { id } = req.params;
  try {
    const animal = await RoundToShow.findByIdAndUpdate(id, req.body);
    if (!animal) {
      throw new Error(`Round To Show not found!, id: ${id}`);
    }
    response.payload = animal;
  } catch (error) {
    response.ok = false;
    response.message = error.message;
  }

  res.json(response);
});

// Delete Round To Show By Id
router.delete("/:id", async (req, res, next) => {
  const response = { ok: true };
  const { id } = req.params;
  try {
    const animal = await RoundToShow.findByIdAndDelete(id);
    if (!animal) {
      throw new Error(`Round To Show not found!, id: ${id}`);
    }
    response.payload = animal;
  } catch (error) {
    response.ok = false;
    response.message = error.message;
  }

  res.json(response);
});

module.exports = router;
