const express = require('express');
const app = express();
const colors = require('colors')
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

const cors = require('cors');

app.use(express.json());

app.use(cookieParser());

app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000']
}))
dotenv.config({ path: './config/config.env' });

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