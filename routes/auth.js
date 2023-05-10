const express = require('express');
const router = express.Router();
const { createUser, signinUser, signoutUser, getMe } = require('../controllers/auth.js');
const { protect } = require("../Middleware/auth.js");

router.post('/signup', createUser);
router.post('/signin', signinUser);
router.post('/signout', signoutUser);

router.get('/me', protect, getMe);

module.exports = router;