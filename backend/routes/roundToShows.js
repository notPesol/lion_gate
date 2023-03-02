const dayjs = require("dayjs");
const express = require("express");
const { loginAuth, adminAuth } = require("../middlewares/auth");
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
router.post("/", loginAuth, adminAuth, async (req, res, next) => {
  const response = { ok: true };
  const roundData = req.body;
  try {
    const roundToShow = await RoundToShow.findOne({
      time: roundData.time,
      stage: roundData.stage,
    }).populate([
      { path: "animal", select: "showDuration" },
      { path: "stage", select: "no" },
    ]);

    if (roundToShow) {
      const stage = roundToShow.stage;
      const [hour, min] = roundData.time.split(":");
      const time = dayjs()
        .set("hour", hour)
        .set("minute", min)
        .format("hh:mm A");
      throw new Error(
        `Round To Show with stage no: ${stage.no} and time: ${time} is an exist!`
      );
    }

    const newRoundToShow = new RoundToShow(roundData);
    await newRoundToShow.save();
    response.payload = newRoundToShow;
  } catch (error) {
    response.ok = false;
    response.message = error.message;
  }

  res.json(response);
});

// Update Round To Show By Id
router.put("/:id", loginAuth, adminAuth, async (req, res, next) => {
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
router.delete("/:id", loginAuth, adminAuth, async (req, res, next) => {
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
