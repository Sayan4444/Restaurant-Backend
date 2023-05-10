const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")

const UserSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: [true, 'Please add a name']
    },
    last_name: {
        type: String,
        required: [true, 'Please add a name']
    },
    city: {
        type: String,
        maxlength: [30, 'Please add a proper city name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: [true, "Email already exsists"],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    phone: {
        type: Number,
        unique: [true, 'Please add a phone number'],
        minlength: [10, 'Please add a appropriate phone number min'],
        maxlength: [10, 'Please add a appropriate phone number max'],
    },
    password: {
        type: String,
        select: false
    },
    review: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
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

UserSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

UserSchema.methods.createJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
}

const User = mongoose.model("User", UserSchema);
module.exports = User