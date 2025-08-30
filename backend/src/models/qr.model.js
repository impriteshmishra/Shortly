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
    }
},
    {
        timestamps: true
    }
);

const Qr = mongoose.model("url", qrSchema);
export default Qr;