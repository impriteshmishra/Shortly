import express from 'express';
import { getCurrentUser, loginUser, logoutUser, registerUser, resetPassword, sendOtp, sendOtp2, verifyOTP, verifyOTP2 } from '../controllers/auth.controller.js';
import isAuthenticated from '../middleware/auth.middleware.js';
const router = express.Router();

router.route('/sendOtp').post(sendOtp);
router.route('/verifyOtp').post(verifyOTP);
router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').get(logoutUser)
router.route('/resetpassword/sendOtp').post(sendOtp2)
router.route('/resetpassword/verifyOtp').post(verifyOTP2)
router.route('/resetpassword/submit').post(resetPassword)
router.route('/me').get(isAuthenticated, getCurrentUser)

export default router;