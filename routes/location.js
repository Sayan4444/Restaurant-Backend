const express = require('express');
const router = express.Router();
const { locationtData } = require('../controllers/location.js');

router.get('/', locationtData);

module.exports = router;