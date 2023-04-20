const mongoose = require('mongoose');
const colors = require('colors')

mongoose.set('strictQuery', false);

const DB = process.env.MONGO_URI;

connectDB = () => {
    mongoose.connect(DB)
        .then(() => console.log("connected to mongoDB server".green.bold))
        .catch((err) => console.log("not connected to mongo server".red.bold));
}

module.exports = connectDB;
