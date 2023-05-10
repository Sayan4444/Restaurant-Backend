const express = require('express');
const router = express.Router();
const { getRestaurantData } = require('../controllers/restaurant');

router.get('/', getRestaurantData);

module.exports = router;