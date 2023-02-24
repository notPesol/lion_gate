const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Please provide an username!"],
    lowercase: true,
    unique: [true, "username exist"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password!"],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("user", userSchema);
