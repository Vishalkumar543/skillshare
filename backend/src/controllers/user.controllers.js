import {User} from "../models/auth.models.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import { ApiResponse } from "../utils/ApiResponse.js"


const getAllUsers = asyncHandler(async (req,res) =>{
    const users = await User.find({})

    res.status(200).json(
        new ApiResponse(200,users,"users fetched successfully")
    )

})


export {getAllUsers}