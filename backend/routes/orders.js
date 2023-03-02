const dayjs = require("dayjs");
const express = require("express");
const { loginAuth, adminAuth } = require("../middlewares/auth");
const router = express.Router();
const Order = require("../models/Order");
const RoundToShow = require("../models/RoundToShow");
const Stage = require("../models/Stage");

// Get Order List
router.get("/", loginAuth, adminAuth, async (req, res, next) => {
  const response = { ok: true };
  try {
    const result = await Order.find()
      .populate([
        { path: "user", select: ["username", "_id"] },
        {
          path: "roundToShow",
          select: ["no", "time", "animal", "stage"],
          populate: [{ path: "animal" }, { path: "stage" }],
        },
      ])
      .exec();
    if (!result) {
      throw new Error(`Order not found!, id: ${id}`);
    }
    response.payload = result;
  } catch (error) {
    response.ok = false;
    response.message = error.message;
  }

  res.json(response);
});

// Get Order By Id
router.get("/:id", async (req, res, next) => {
  const response = { ok: true };
  const { id } = req.params;
  try {
    const result = await Order.findById(id)
      .populate([
        { path: "user", select: ["username", "_id"] },
        {
          path: "roundToShow",
          select: ["no", "time", "animal", "stage"],
          populate: [{ path: "animal" }, { path: "stage" }],
        },
      ])
      .exec();
    if (!result) {
      throw new Error(`Order not found!, id: ${id}`);
    }
    response.payload = result;
  } catch (error) {
    response.ok = false;
    response.message = error.message;
  }

  res.json(response);
});

// Create Order
const orderError = new Error("Order failed");
router.post("/", loginAuth, async (req, res, next) => {
  const response = { ok: true };
  const user = req.user;
  const body = req.body;
  const orderData = {
    date: dayjs().format("YYYY-MM-DD"),
    seatNo: body.seatNo,
    roundToShow: body.roundToShow,
    user: user?._id,
  };
  try {
    const roundToShow = await RoundToShow.findById(orderData.roundToShow);
    if (!roundToShow) {
      throw orderError;
    }

    const stage = await Stage.findById(roundToShow.stage);
    if (orderData.seatNo > stage.seatAmount) {
      throw orderError;
    }

    const order = await Order.findOne(orderData).exec();
    console.log("order: ", order);
    if (order) {
      throw new Error(`Order with seat number: ${orderData.seatNo} is exist!`);
    }
    const newOrder = new Order(orderData);
    await newOrder.save();
    response.payload = newOrder;
  } catch (error) {
    response.ok = false;
    response.message = error.message;
  }

  res.json(response);
});

// Delete Order By Id
router.delete("/:id", loginAuth, adminAuth, async (req, res, next) => {
  const response = { ok: true };
  const { id } = req.params;
  try {
    const order = await Order.findByIdAndDelete(id);
    if (!order) {
      throw new Error(`Order not found!, id: ${id}`);
    }
    response.payload = order;
  } catch (error) {
    response.ok = false;
    response.message = error.message;
  }

  res.json(response);
});

module.exports = router;
