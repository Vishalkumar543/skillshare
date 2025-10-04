import jwt from "jsonwebtoken"
import { ApiError } from "../utils/ApiError.js";
import {User} from "../models/auth.models.js"

const protect = async (req,res,next) =>{
  
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        
        if (!token) {
            throw new ApiError(401,"You are not logged in. Please login to access")
        }
      try {
        const decode = jwt.verify(token,process.env.JWT_SECRET);
    
        const currentUser  = await User.findById(decode.userid)
    
        if (!currentUser) {
            throw new ApiError(400,"The user belonging to this token does not exist.")
        }
    
        req.user = currentUser;
    
        next()
    } catch (error) {
        return res.status(401).json({ message: "Token expired or invalid" });
    }
}

export {protect}