import express from 'express';
import { getAllUserUrls } from '../controllers/user.controller.js';
import isAuthenticated from '../middleware/auth.middleware.js';
const router = express.Router();


router.route('/urls').post(isAuthenticated,getAllUserUrls)


export default router;