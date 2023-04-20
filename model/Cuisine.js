const mongoose = require("mongoose");

const CuisineSchema = new mongoose.Schema({
  name: {
    type: String,
  },
});

const Cuisine = mongoose.model("Cuisine", CuisineSchema);
module.exports = Cuisine