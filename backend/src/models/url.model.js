import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
    full_url: {
        type:String,
        required: true,
    },
    short_url: {
        type: String,
        required: true,
        unique: true,
        index:true
    },
    click: {
        type: Number,
        required: true,
        default: 0
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
});

const url = mongoose.model("url", urlSchema);
export default url;