const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
  roundToShow: {
    type: mongoose.Types.ObjectId,
    ref: "roundToShow",
  },
  seatNo: Number,
});

module.exports = mongoose.model("orderShow", orderSchema);
