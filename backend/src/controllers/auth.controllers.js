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

//register

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


//forgot password

const forgotPassword = asyncHandler(async (req,res) =>{
    const {email} = req.body

    const user = await User.findOne({email})

    if(!user){
        throw new ApiError(400,"user not found");
    }

    const otp = generateOtp();

    user.otp = otp;
    user.otpExpiry = Date.now() + 10 * 60 * 1000;

    await sendEmail({
        email:user.email,
        subject:"OTP for forgot password",
        html:`<h1>Your otp is ${otp} </h1>`
    })

    return res.status(200).json(
        new ApiResponse(200,"successfully hit forgot password")
    )

})


const resetPassword = asyncHandler(async(req,res)=>{
    const {email,otp,password} = req.body

    const user = await User.findOne({
        email,
        otp,
        otpExpiry:{$gt: Date.now()},
    })

    if(!user){
        throw new ApiError(400,"Invalid or expired OTP");
        
    }

    user.password = password
    user.otp =undefined
    user.otpExpiry = undefined
    await user.save({validateBeforeSave:false})


    return res.status(200).json(
        new ApiResponse(200,"password reset successfully")
    )

})






export {register,
        login,
        verifyUser,
        forgotPassword,
        resetPassword
    }