import { findUserById } from "../dao/user.dao.js";
import { verifyToken } from "./helper.js";

export const attachUser = async (req,res,next) => {
    const token = req.cookies.accessToken;
    console.log(token, "attach token test")
    if(!token) return next();
    try {
        const decoded = verifyToken(token);
        const user = await findUserById(decoded.payload.id);
        // console.log("test decoded user",user)
        if(!user) return next();
        req.user = user;
        next();
    } catch (error) {
        next();
    }
} 