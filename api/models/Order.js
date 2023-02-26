const dayjs = require("dayjs");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
  date: {
    type: String,
    default: () => {
      return dayjs().format("YYYY-MM-DD");
    },
  },
  seatNo: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    required: true,
  },
  roundToShow: {
    type: mongoose.Types.ObjectId,
    ref: "roundToShow",
    required: true,
  },
});

module.exports = mongoose.model("orderShow", orderSchema);
