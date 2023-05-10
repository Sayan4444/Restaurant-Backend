const mongoose = require("mongoose");
const Cuisine = require("../model/Cuisine.js")
const Location = require("../model/Location.js")
const Item = require("../model/Item.js")
const Review = require("../model/Review.js")

const RestaurantSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  main_image: {
    type: String,
  },
  description: {
    type: String,
  },
  images: {
    type: [String],
  },
  open_time: {
    type: String,
  },
  close_time: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  slug: {
    type: String,
    unique: true,
  },
  price: {
    type: String,
    enum: ["CHEAP", "REGULAR", "EXPENSIVE"],
  },
  location_id: {
    type: mongoose.Schema.ObjectId,
    ref: "Location",
  },
  cuisine_id: {
    type: mongoose.Schema.ObjectId,
    ref: "Cuisine",
  },
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

RestaurantSchema.virtual('item_id', {
  ref: 'Item',
  localField: '_id',
  foreignField: 'restaurant_id',
  justOne: false
})

RestaurantSchema.virtual('review_id', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'restaurant_id',
  justOne: false
})

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);
module.exports = Restaurant