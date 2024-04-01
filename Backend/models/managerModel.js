import mongoose from "mongoose";

const managerSchema=new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    token:{
        type:String
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["manager","employee"],
        required:true
    },
    timeShet:
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"TimeSheet"
        }
    ,
    employee:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ]
})

export const Manager=mongoose.model("Manager",managerSchema)