import jwt from "jsonwebtoken";
import { nanoid } from "nanoid"
import { cookieOption } from "../config/cookie.config.js";

export const generateNanoId = (length) => {
    return nanoid(length);
}

export const signToken = (payload) => {
   return jwt.sign({payload}, process.env.SECRET_KEY, {expiresIn: "1h"});
}

export const verifyToken = (token) => {
    return jwt.verify(token, process.env.SECRET_KEY);
}