import Stripe from "stripe";
import User from "../models/user.model.js";
import Transaction from "../models/transaction.model.js";

import dotenv from 'dotenv';
dotenv.config()

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const stripeWebhook = async (req, res) => {
    const sig = req.headers["stripe-signature"];

    let event;
    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (error) {
        console.log("webhook sig not verified", error.message);
        return res.status(400).send(`webhook error: ${error.message}`)
    }

    // handle event types
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        const userId = session.metadata.userId;

        if (userId) {
            await Transaction.create({
                userId,
                sessionId: session.id,
                paymentIntentId: session.payment_intent,
                amountTotal: session.amount_total/100,
                currency: session.currency,
                status: session.payment_status,
            })

            await User.findByIdAndUpdate(userId, { isPremiumUser: true });
            // console.log("user is premium now.",session);

        }
    }
    res.json({
        received: true
    })
};