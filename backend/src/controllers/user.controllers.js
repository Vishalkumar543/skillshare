import {User} from "../models/auth.models.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import {ApiError} from "../utils/ApiError.js"


const getAllUsers = asyncHandler(async (req,res) =>{
    const users = await User.find({})

    res.status(200).json(
        new ApiResponse(200,users,"users fetched successfully")
    )

})


const getProfile = asyncHandler(async (req,res) =>{
    const user = await User.findById(req.user.id).select("-password");

   if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(
        new ApiResponse(200,user,"profile get successfully")
    )
})


export {getAllUsers,getProfile}