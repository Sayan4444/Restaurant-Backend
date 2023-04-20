const express = require('express');
const router = express.Router();
const { cuisinetData } = require('../controllers/cuisine.js');

router.get('/', cuisinetData);

module.exports = router;