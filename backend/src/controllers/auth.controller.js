import { cookieOption } from "../config/cookie.config.js";
import { loginUserService, registerUserService } from "../services/auth.Service.js";

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const { token, newUser } = await registerUserService(name, email, password);
  // console.log("newUser", newUser);
  req.user = newUser;
  res.cookie("accessToken", token, cookieOption);
  res.status(200).json({
    message: "User registered successfully.",
  
  })
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

