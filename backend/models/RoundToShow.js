const mongoose = require("mongoose");
const { Schema } = mongoose;

const roundToShowSchema = new Schema({
  no: {
    type: Number,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  animal: {
    type: mongoose.Types.ObjectId,
    ref: "animal",
    required: true,
  },
  stage: {
    type: mongoose.Types.ObjectId,
    ref: "stage",
    required: true,
  },
});

module.exports = mongoose.model("roundToShow", roundToShowSchema);
