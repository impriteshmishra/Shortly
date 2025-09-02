import express from 'express';
import { getAllUserQr, getAllUserUrls } from '../controllers/user.controller.js';
import isAuthenticated from '../middleware/auth.middleware.js';
import { makePremium } from '../controllers/payment.controller.js';
import { fetchTransaction } from '../controllers/transaction.controller.js';
const router = express.Router();

router.route('/urls').post(isAuthenticated, getAllUserUrls)
router.route("/premium/:userId").post(isAuthenticated, makePremium);
router.route("/transaction/:sessionId").get(fetchTransaction);
router.route('/qrs').post(isAuthenticated, getAllUserQr)

export default router;