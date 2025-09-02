import mongoose from "mongoose";


const qrSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
    },
    qrCode: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    description: {
        type: String,
        required: true
    },
    expireAt: {
        type: Date
    }
},
    {
        timestamps: true
    }
);


const Qr = mongoose.model("Qr", qrSchema);
export default Qr;