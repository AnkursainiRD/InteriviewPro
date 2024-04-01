import mongoose  from "mongoose";

const userSchema=new mongoose.Schema({
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
    timeSheet:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"TimeSheet"
    }],
    rating:{
        type:String,
    },
    manager:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Manager"
    },
    edit:{
        type:Boolean,
        default:true
    }
})

export const User=mongoose.model("User",userSchema)