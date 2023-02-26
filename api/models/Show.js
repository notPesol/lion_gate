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
  startTime: Date
})

module.exports = mongoose.model('round', showSchema);