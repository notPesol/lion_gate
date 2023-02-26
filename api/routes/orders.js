const dayjs = require("dayjs");
const express = require("express");
const { loginAuth, adminAuth } = require("../middlewares/auth");
const router = express.Router();
const Order = require("../models/Order");

// Get Order List
// router.get("/", async (req, res, next) => {
//   const response = { ok: true };
//   try {
//     const result = await Stage.find().exec();
//     response.payload = result;
//   } catch (error) {
//     response.ok = false;
//     response.message = error.message;
//   }

//   res.json(response);
// });

// Get Order By Id
router.get("/:id", async (req, res, next) => {
  const response = { ok: true };
  const { id } = req.params;
  try {
    const result = await Order.findById(id).exec();
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
    const orders = await Order.find(orderData).exec();
    console.log(orders);
    if (orders.length > 0) {
      throw new Error("Order failed");
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
