const mongoose = require('mongoose');
const { Schema } = mongoose;

const animalSchema = new Schema({
  name: String,
  species: String,
  showDuration: Number,
  type: String
})

module.exports = mongoose.model('animal', animalSchema);