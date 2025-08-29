import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, ref: "User", required: true
    },
    sessionId: { type: String, required: true },
    paymentIntentId: { type: String },
    amountTotal: { type: Number },
    currency: { type: String },
    status: { type: String }
}, { timestamps: true });

const Transaction = mongoose.model("Transaction", transactionSchema);
export default Transaction;