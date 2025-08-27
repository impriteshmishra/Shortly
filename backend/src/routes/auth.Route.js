import express from 'express';
import { getCurrentUser, loginUser, logoutUser, registerUser, sendOtp, verifyOTP } from '../controllers/auth.controller.js';
import isAuthenticated from '../middleware/auth.middleware.js';
const router = express.Router();

router.route('/sendOtp').post(sendOtp);
router.route('/verifyOtp').post(verifyOTP);
router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').get(logoutUser)
router.route('/me').get(isAuthenticated, getCurrentUser)

export default router;