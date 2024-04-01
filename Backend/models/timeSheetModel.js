import mongoose from "mongoose";

const timeSheetSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    task:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Task"
        }
    ],
    
})

export const TimeSheet=mongoose.model("TimeSheet",timeSheetSchema)