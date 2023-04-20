const mongoose = require("mongoose");

const LocationSchema = new mongoose.Schema({
  name: {
    type: String,
  },
});

const Location = mongoose.model("Location", LocationSchema);
module.exports = Location