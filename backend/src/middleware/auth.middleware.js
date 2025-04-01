import jwt from "jsonwebtoken";
import User from "..models/user.model.js";

export const protectRoute=async (res,req,next)=>{
    try {
        const token=req.cookie.jwt;
        if(!token){
            return res.status(401).json({message:"unaurthorised - No token provided"})
        }
    const decoded=jwt.verify(token,process.env.JWT_SECRET)
    if(!decoded){
        return res.status(401).json({message:"Unarthorised - Invalid token"})
    }
    const user=await User.findById(decoded.userId).select("-password");

    if(!user){
        return res.status(401).json({message:"User not found"});
    }
    req.user=user

    next()

    } catch (error) {
        console.log("error in protectRoute middleware:",error.message);
        res.status(500).json({message:"Internal server error"})
        
    }
}