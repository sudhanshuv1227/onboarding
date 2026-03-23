const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../middleware/auth');

router.post('/auth', userController.auth);
router.post('/verify-otp', userController.verifyOtp);
router.post('/onboard', authenticateToken, userController.onboard);

module.exports = router;
