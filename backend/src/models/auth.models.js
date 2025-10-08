import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 20,
  },
  avatar: {
    type: String,
  },
  isVerify:{
    type: Boolean,
    default: false
  },
  isProfileComplete:{
    type: Boolean,
    default: false
  },
  otp: {
    type: Number,
    default: null,
  },
  otpExpiry: {
    type: Date,
    default: null,
  },
  resetPasswordOtp: {
    type: String,
    default: null,
  },
  resetPasswordOtpExpiry: {
    type: Date,
    default: Date.now,
  },
  skillsTeach:[],
  skillsLearn:[],
  department:{
    type:String
  },
  course:{
    type:String
  },
  year:{
    type:String
  },
  rating:{
    type:Number,
    default:0
  }


},{timestamps:true});


userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }

    this.password = await bcrypt.hash(this.password,10);
    next();

})


userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}














export const User = mongoose.model("User", userSchema);
