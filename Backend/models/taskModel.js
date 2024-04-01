import mongoose from "mongoose";

const taskSchema=new mongoose.Schema({
    description:{
        type:String,
        require:true
    },
    startTime:{
        type:Date,
        default:Date.now()
    },
    endTime:{
        type:Date,
        default:Date.now()
    },
    timeSheet:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"TimeSheet"
    }
})

export const Task=mongoose.model("Task",taskSchema)