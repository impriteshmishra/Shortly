import jwt from "jsonwebtoken";
import { verifyToken } from "../utils/helper.js";
import { findUserById } from "../dao/user.dao.js";
const isAuthenticated = async (req,res,next)=>{
        const token = req.cookies.accessToken;
        if(!token){
            return res.status(401).json({
                message:"User not authenticated.",
                success:false,
            });
        }
        try {
            const decoded = verifyToken(token);
            // console.log(decoded)
            const user = await findUserById(decoded?.payload.id);
            // console.log(user)
            if(!user) return res.status(401).json({message: "Unauthorized"});
            req.user = user;
            next();
        } catch (error) {
         return res.status(401).json({message: "Unauthorized."})   
        }                                                                                                                              
}
export default isAuthenticated;