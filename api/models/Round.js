const mongoose = require('mongoose');
const { Schema } = mongoose;

const roundSchema = new Schema({
  name: String
})

module.exports = mongoose.model('round', roundSchema);