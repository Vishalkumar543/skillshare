import {User} from '../models/auth.models.js';
import {Session} from "../models/session.models.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js";

//create session
const createSession = asyncHandler(async (req, res) => {

        const {teacherId,skill,date,place} = req.body;

        const studentId = req.user._id; //from protect middleware

        const teacher = await User.findById(teacherId);

        if (!teacher) {
            throw new ApiError(400,"Teacher not found");
            
        }

        const newSession = await Session.create({
            teacher:teacherId,
            student:studentId,
            skill:skill,
            date:date,
            place:place,
            status:"pending"
        })


        return res.status(200).json(
            new ApiResponse(200,newSession,"Session request sent successfully")
        )

})


//getAllSessions

const getAllSessions = asyncHandler(async(req,res)=>{
    const userId = req.user._id;

    const sessions = await Session.find({
        $or:[{student:userId},{teacher:userId}]
    })
    .populate("student","name email")
    .populate("teacher","name email");

    const requested = sessions.filter(s => s.student._id.toString() === userId.toString());
    const received = sessions.filter(s => s.teacher._id.toString() === userId.toString());

    res.status(200).json(
        new ApiResponse(200,{requested,received},"session fetched successfully")
    )
})

const updateSession = asyncHandler(async (req, res) => {
    const { status } = req.body;
    const { sessionId } = req.params;
    const userId = req.user._id; // from auth middleware

    // 1️⃣ Validate status value
    const allowedStatuses = ["requested", "accepted", "rejected", "completed"];
    if (!allowedStatuses.includes(status)) {
        return res.status(400).json({ message: "Invalid status value" });
    }

    // 2️⃣ Find session
    const session = await Session.findById(sessionId);
    if (!session) {
        return res.status(404).json({ message: "Session not found" });
    }

    // 3️⃣ Ensure only the teacher can accept/reject
    if (session.teacher.toString() !== userId.toString()) {
        return res.status(403).json({ message: "Not authorized to update this session" });
    }

    // 4️⃣ Update session status
    session.status = status;
    await session.save({ validateBeforeSave: false });

    // 5️⃣ Populate for better response
    const updatedSession = await Session.findById(sessionId)
        .populate("student", "name email")
        .populate("teacher", "name email");

    // 6️⃣ Send response
    res.status(200).json(
        new ApiResponse(200, updatedSession, "Session updated successfully")
    );
});





export {createSession,getAllSessions,updateSession}