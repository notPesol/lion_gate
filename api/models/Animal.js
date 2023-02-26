const mongoose = require('mongoose');
const { Schema } = mongoose;

// const AnimalType = require('./AnimalType');

const animalSchema = new Schema({
  name: String,
  species: String,
  showDuration: Number,
  type: String
  // animalType: {
  //   type: mongoose.Types.ObjectId,
  //   ref: 'animalType'
  // }
})

module.exports = mongoose.model('animal', animalSchema);