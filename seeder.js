const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' });

const Cuisine = require('./model/Cuisine.js');
const Item = require('./model/Item.js');
const Location = require('./model/Location.js');
const Restaurant = require('./model/Restaurant.js');
const User = require('./model/User.js');
const Review = require('./model/Review.js');

const data = require('./data.js');
const cuisineData = data.cuisineData;
const locationData = data.locationData;
const userData = data.userData;

const connectDB = require('./config/db.js');
connectDB();

const resetDB = async () => {
    try {
        // await Cuisine.deleteMany();
        // await Item.deleteMany();
        // await Location.deleteMany();
        // await Restaurant.deleteMany();
        // await User.deleteMany();
        await Review.deleteMany();

        // await Cuisine.create(cuisineData);
        // await Location.create(locationData);
        // await User.create(userData);

        // const restaurantData = await data.restaurantDataHandler();
        // await Restaurant.create(restaurantData);

        // const itemData = await data.itemDataHandler();
        // await Item.create(itemData)

        const reviewData = await data.reviewDataHandler();
        await Review.create(reviewData);

        console.log("DB reset".green.inverse);
        process.exit();
    } catch (error) {
        console.log('Error:', error.message);
        process.exit();
    }
}

if (process.argv[2] === '-r') resetDB();
