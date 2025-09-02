import  express  from 'express';
import { stripeWebhook } from '../utils/stripe.webhook.js';
const router = express.Router();

router.route("/stripe").post(express.raw({type: "application/json"}),stripeWebhook);

export default router;