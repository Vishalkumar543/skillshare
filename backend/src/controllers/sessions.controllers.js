import {User} from '../models/auth.models.js';
import {Session} from "../models/session.models.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js";


const createSession = asyncHandler(async (req, res) => {

        const {teacherId,skills,date,place} = req.body;

        const studentId = req.user._id; //from protect middleware

        const teacher = await User.findById(teacherId);

        if (!teacher) {
            throw new ApiError(400,"Teacher not found");
            
        }

        const newSession = await Session.create({
            teacher:teacherId,
            student:studentId,
            skill:skills,
            date:date,
            place:place,
            status:"pending"
        })


        return res.status(200).json(
            new ApiResponse(200,newSession,"Session request sent successfully")
        )

})




export {createSession}