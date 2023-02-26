const mongoose = require('mongoose');
const { Schema } = mongoose;

const stageSchema = new Schema({
  stageNo: Number,
  seatAmount: Number,
  price: Number
})

module.exports = mongoose.model('stage', stageSchema);