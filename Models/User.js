const mongoose = require("mongoose");
const moment = require("moment");

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
  birth_date_display: {
    type: String,
  },
  created_date: {
    type: Date,
    default: Date.now,
    //This field is used for sorting as it's a Date object
  },
  created_date_display: {
    type: String,
    //This field is used for searching & displaying as it's a String object
  },
});

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
