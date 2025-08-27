import { cookieOption } from "../config/cookie.config.js";
import { loginUserService, registerUserService } from "../services/auth.Service.js";
import OtpVerify from "../models/otp.model.js";
import nodemailer from "nodemailer";
import User from "../models/user.model.js";

export const sendOtp = async (req, res) => {
  const { email } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing && existing.verified) {
      return res.status(400).json({
        error: "Email already verified!"
      })
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = Date.now() + 10 * 60 * 1000;
    await OtpVerify.findOneAndUpdate(
      { email },
      {
        otp: otp,
        otpExpires: otpExpires,
        verified: false
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    )

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: "priteshlearning@gmail.com", pass: process.env.GMAIL_PASS }
    })

    await transporter.sendMail({
      from: "priteshlearning@gmail.com",
      to: email,
      subject: "Shortly. Verify your email.",
      text: `Your OTP is ${otp}. It expires in 10 minutes.`
    })

    res.json({
      message: "OTP sent to email!"
    })

  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      error: error.message
    })
  }
}

export const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {

    const record = await OtpVerify.findOne({ email });

    if (!record) return res.status(400).json({ error: "Email not find!" });
    if (record.otp !== otp) return res.status(400).json({ error: "Invalid OTP" });
    if (record.otpExpires < Date.now()) return res.status(400).json({ error: "OTP expired!" });

    record.verified = true;
    await record.save();
    res.json({
      message: "Email verified successfully!"
    })

  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      error: error.message
    })
  }
}

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const record = await OtpVerify.findOne({ email });
    if (!record || !record.verified) {
      return res.status(400).json({ message: "Email not verified!" });
    }
    const { token, newUser } = await registerUserService(name, email, password);
    // console.log("newUser", newUser);
    req.user = newUser;

    await OtpVerify.deleteOne({ email });
    res.cookie("accessToken", token, cookieOption);
    res.status(200).json({
      message: "User registered successfully.",

    })
  } catch (error) {
    return res.status(400).json({
      message: error.message || "Something went wrong"
    })
  }



}

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const { token, user } = await loginUserService(email, password);
  // console.log(token);
  //  console.log(user);

  req.user = user;
  res.cookie("accessToken", token, cookieOption);
  res.status(200).json({ user: user, message: "Login Success." })
}

export const logoutUser = async (req, res) => {
  // console.log("logout controller");
  res.clearCookie("accessToken", cookieOption)
  res.status(200).json({ message: "logout success" })
}

export const getCurrentUser = async (req, res) => {
  res.status(200).json({ user: req.user });
}

