const express = require('express');
const { sendOtp, verifyOtp, resendOtp, getMe, logout } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.post('/resend-otp', resendOtp);
router.post('/logout', protect, logout);
router.get('/me', protect, getMe);

module.exports = router;
