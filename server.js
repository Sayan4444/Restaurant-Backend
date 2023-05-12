const express = require('express');
const app = express();
const colors = require('colors')
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

dotenv.config({ path: './config/config.env' });

const cors = require('cors');

app.use(express.json());
app.use(cookieParser());

const corsOptions = {
    credentials: true,
    origin: process.env.ENV === 'dev' ? 'http://localhost:3000' : 'https://restaurant-frontend-beta.vercel.app'
}
app.use(cors(corsOptions));



const connectDB = require('./config/db');
connectDB();

const restaurantRouter = require('./routes/restaurant');
const locationRouter = require('./routes/location');
const cuisineRouter = require('./routes/cuisine');
const authRouter = require('./routes/auth');

app.use('/api/restaurant', restaurantRouter);
app.use('/api/location', locationRouter);
app.use('/api/cuisine', cuisineRouter);
app.use('/api/auth', authRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`.blue.bold));