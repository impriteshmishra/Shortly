import  express  from 'express';
import { stripeWebhook } from '../utils/stripe.webhook.js';
import isAuthenticated from '../middleware/auth.middleware.js';
const router = express.Router();

router.route("/stripe").post(express.raw({type: "application/json"}),stripeWebhook);

export default router;