const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderShowSchema = new Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'user'
  },
  show: {
    type: mongoose.Types.ObjectId,
    ref: 'show'
  },
  seatNo: Number
})

module.exports = mongoose.model('orderShow', orderShowSchema);