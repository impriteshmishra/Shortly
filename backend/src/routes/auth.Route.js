import express from 'express';
import { getCurrentUser, loginUser, logoutUser, registerUser } from '../controllers/auth.controller.js';
import isAuthenticated from '../middleware/auth.middleware.js';
const router = express.Router();


router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').get(logoutUser)
router.route('/me').get(isAuthenticated, getCurrentUser)

export default router;