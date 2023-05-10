const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
    first_name: {
        type: String,
    },
    last_name: {
        type: String
    },
    text: {
        type: String
    },
    rating: {
        type: Number
    },
    restaurant_id: {
        type: mongoose.Schema.ObjectId,
        ref: "Restaurant",
    },
    user_id: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
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

const Review = mongoose.model("Review", ReviewSchema);
module.exports = Review