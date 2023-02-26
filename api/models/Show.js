const mongoose = require('mongoose');
const { Schema } = mongoose;

const showSchema = new Schema({
  round: {
    type: mongoose.Types.ObjectId,
    ref: 'round'
  },
  animal: {
    type: mongoose.Types.ObjectId,
    ref: 'animal'
  },
  stage: {
    type: mongoose.Types.ObjectId,
    ref: 'stage'
  },
  time: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('round', showSchema);