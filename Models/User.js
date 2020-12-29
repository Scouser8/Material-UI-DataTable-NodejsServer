const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  birth_date: {
    type: Date,
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
});

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
