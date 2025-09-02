import Transaction from '../models/transaction.model.js';

export const fetchTransaction = async (req, res) => {
    const { sessionId } = req.params;

    try {
        const transaction = await Transaction.findOne({ sessionId });

        if (!transaction) {
            return res.status(404).json({ message: "Transaction not found" });
        }
        res.status(200).json(
            {
               transaction
            }
        )

    } catch (error) {
        console.error("Error fetching transaction:", error.message);
        res.status(500).json({ error: "Server error" });
    }
}