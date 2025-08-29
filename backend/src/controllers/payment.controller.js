import Stripe from "stripe";
import User from "../models/user.model.js";

import  dotenv from 'dotenv';
dotenv.config()

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)


export const stripePayment = async (userId) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: "Premium Subscription",
                        },
                        unit_amount: 500, // $5.00
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `${process.env.URL_FRONTEND}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.URL_FRONTEND}/payment-cancel`,
            metadata: { userId }, // attach userId
        });

        return session;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const makePremium = async (req, res) => {
    const { userId } = req.params;
    const { gateway } = req.body;
    console.log(userId, "payment");
    console.log(gateway, "gateaway");

    try {
        const user = await User.findById(userId);
        console.log(user);

        if (!user) {
            return res.status(404).json({
                message: "User not found.",
                success: false
            })
        }
        if (gateway === 'Stripe') {
         const session = await stripePayment(userId);
         console.log("stripe session", session);
         
         return res.status(200).json({
            url:session.url,
            success: true
         })
 
        }
        else {
            console.log("razorpay");

        }


    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server Error.",
            success: false
        })

    }
}