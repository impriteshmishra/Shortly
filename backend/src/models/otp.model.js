import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    otp: {type: String, required: true},
    otpExpires: {type: Date, required:true},
    verified:{
        type: Boolean,
        default: false
    }
});

const OtpVerify = mongoose.model("OtpVerify", otpSchema);
export default OtpVerify;
