const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: String,
  },
  restaurant_id: {
    type: mongoose.Schema.ObjectId,
    ref: "Restaurant",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

const Item = mongoose.model("Item", ItemSchema);
module.exports = Item