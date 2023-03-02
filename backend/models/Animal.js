const mongoose = require("mongoose");
const { Schema } = mongoose;

const animalSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  species: String,
  showDuration: Number,
  type: String,
});

module.exports = mongoose.model("animal", animalSchema);
