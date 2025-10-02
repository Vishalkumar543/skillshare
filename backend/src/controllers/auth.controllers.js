import { User } from "../models/auth.models.js";
import bcrypt from "bcryptjs";
import {asyncHandler} from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {uploadImage} from "../utils/cloudnary.js"
import { sendEmail } from "../utils/email.js";
import {generateOtp} from "../utils/generateOtp.js"
import jwt from "jsonwebtoken"


const createToken = (userid) => {
    
    return jwt.sign({userid},process.env.JWT_SECRET,{ expiresIn: "1d" })
}


const register = asyncHandler(async (req,res)=>{

    const {name,email,password} = req.body;

    if([name,email,password].some((field)=>field.trim()==="")){
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({email})

    if(existedUser){
        throw new ApiError(400, "user already registered")
    }

    const filePath = req.file.path;

    const avatar = await uploadImage(filePath)

    // console.log(avatar.url);

    const otp = generateOtp()

    const otpExpiry = Date.now() + 24 * 60 * 60 * 1000;


    const user = await User.create({
        name,
        email,
        password,
        avatar:avatar.url,
        otp,
        otpExpiry
    })

    const token = createToken(user._id)
    
    const createdUser = await User.findById(user._id).select("-password")

    await sendEmail({
        email:createdUser.email,
        subject:"OTP for email verification",
        html:`<h1>Your otp is ${otp} </h1>`
    })

    return res.status(201).json(
       new ApiResponse(201,{ user: createdUser, token },"user registered")
    )
    


})

// login

const login = asyncHandler(async(req,res)=>{
    const {email,password} = req.body

    const user = await User.findOne({email})

    if(!user){
        throw new ApiError(400,"user doesn't exist")
    }

    const isPasswordCorrect = await user.comparePassword(password)

    if (!isPasswordCorrect) {
        throw new ApiError(400, "Inavlid email or password")
    }


     const token = createToken(user._id)

    return res.status(200).json(
        new ApiResponse(200,{user,token},"logged In successfully")
    )
})

//verify user

const verifyUser = asyncHandler(async(req,res)=>{
    const {otp} = req.body

    if(!otp){
        throw new ApiError(400,"otp is missing");
    }

    const user = req.user

    if (user.otp !== otp) {
        throw new ApiError(400,"Invalid OTP");
    }

    if (Date.now() > user.otpExpiry) {
        throw new ApiError(400,"OTP has expired. Please request a new OTP");
    }

    user.isVerify = true
    user.otp = undefined
    user.otpExpiry = undefined


    await user.save({validateBeforeSave:false})


    return res.status(200).json(
        new ApiResponse(200,user,"user has verified")
    )

})






export {register,login,verifyUser}