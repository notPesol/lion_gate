const mongoose = require("mongoose");
const { Schema } = mongoose;

const stageSchema = new Schema({
  no: {
    type: Number,
    unique: true,
    required: true,
  },
  seatAmount: {
    type: Number,
    default: 20,
  },
  price: {
    type: Number,
    default: 40,
  },
});

module.exports = mongoose.model("stage", stageSchema);
