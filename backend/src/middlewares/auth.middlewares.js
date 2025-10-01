import jwt from "jsonwebtoken"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";

const protect = asyncHandler(async (req,_,next) =>{
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
        throw new ApiError(401,"You are not logged in. Please login to access")
    }

    const decode = jwt.verify(token,process.env.JWT_SECRET);

    const currentUser  = await User.findById(decode.id)

    if (!currentUser) {
        throw new ApiError(400,"The user belonging to this token does not exist.")
    }

    req.user = currentUser;

    next()
})

export {protect}