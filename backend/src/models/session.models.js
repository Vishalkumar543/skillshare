import mongoose from "mongoose";

const SessionSchema = new mongoose.Schema({
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  skill: { 
    type: String, 
    required: true 
  },
  date:{
    type:Date,
    required:true
  },
  place:{
    type:String,
    required:true
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected", "completed"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
});


export const Session = mongoose.model("Session",SessionSchema)