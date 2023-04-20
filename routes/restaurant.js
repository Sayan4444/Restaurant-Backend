const express = require('express');
const router = express.Router();
const { restaurantData, restaurantDataBySlug, restaurantDataByLocation } = require('../controllers/restaurant');

router.get('/', restaurantData);
router.get('/search', restaurantDataByLocation);
router.get('/:slug', restaurantDataBySlug);

module.exports = router;