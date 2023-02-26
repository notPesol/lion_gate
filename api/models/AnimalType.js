const mongoose = require('mongoose');
const { Schema } = mongoose;

const animalTypeSchema = new Schema({
  name: {
    type: String,
    unique: true
  },
})

module.exports = mongoose.model('animalType', animalTypeSchema);