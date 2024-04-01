import { User } from "../models/userModel.js";
import { Task } from "../models/taskModel.js";
import { TimeSheet } from "../models/timeSheetModel.js";
import { Manager } from "../models/managerModel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import mongoose from "mongoose";
import { employee } from "../middleware/authMiddleware.js";

//auth controller

const managerSingUp=async(req,res)=>{
    try {
        const {fullName,email,password,role}=req.body;
        if(! fullName || !email || !password || !role){
            return res.status(402).json({
                success:false,
                message:"All fields are required!"
            })
        }

        const checkManager=await Manager.findOne({email:email})
        if(checkManager){
            return res.status(400).json({
                success:false,
                message:"Manager already exists!"
            })
        }


        const hashPassword=await bcrypt.hash(password,10)
        const manager=await Manager.create({fullName,email,password:hashPassword,role})
        if(!manager){
            return res.status(403).json({
                success:false,
                message:"manager creation failed"
            })
        }
        return res.status(200).json({
            success:true,
            message:"Manager Created",
            data:manager
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error occur while signup!"
        }) 
    }
}

const managerLogin=async(req,res)=>{
    try {
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(402).json({
                success:false,
                message:"All fields are requierd!"
            })
        }
        const manager=await Manager.findOne({email:email})
        if(!manager){
            return res.status(404).json({
                success:false,
                message:"manager not exists!"
            })
        }

        if(await bcrypt.compare(password,manager.password))
        {
            const payload={
                id:manager.id,
                email:manager.email,
                role:manager.role
            }

            const token=jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"3h"})
            manager.token=token
            manager.password=undefined

            const option={
                expiresIn: new Date(Date.now()+ 4*24*60*60*100),
                httpOnly:true
            }

            res.cookie("token",token,option).json({
                success:true,
                message:"Login Successfull",
                token,
                manager
            })
        }
        else{
            return res.status(400).json({
                success:false,
                message:"Invaild Password"
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error occur while login!"
        })
    }
}

const signUp=async(req,res)=>{
    try {
        const {fullName,email,password,role,managerEmail}=req.body;
        if(! fullName || !email || !password || !role){
            return res.status(402).json({
                success:false,
                message:"All fields are required!"
            })
        }
        const checkUser=await User.findOne({email:email})
        if(checkUser){
            return res.status(400).json({
                success:false,
                message:"User already exists!"
            })
        }
        const manager=await Manager.findOne({email:managerEmail})
        if(!manager){
            return res.status(404).json({
                success:false,
                message:"Manager not found!"
            })
        }

        const hashPassword=await bcrypt.hash(password,10)
        const user=await User.create({fullName,email,password:hashPassword,role,manager:manager.id})
        const timeSheet= await TimeSheet.create({user:user.id})
        user.timeSheet.push(timeSheet.id)
        user.save()
        if(!user){
            return res.status(403).json({
                success:false,
                message:"User creation failed"
            })
        }
        manager.employee.push(user.id)
        manager.save();
        return res.status(200).json({
            success:true,
            message:"User Created",
            data:user
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error occur while signup!"
        })
    }
}

const login=async(req,res)=>{
    try {
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(402).json({
                success:false,
                message:"All fields are requierd!"
            })
        }
        const user=await User.findOne({email:email})
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not exists!"
            })
        }

        if(await bcrypt.compare(password,user.password))
        {
            const payload={
                id:user.id,
                email:user.email,
                role:user.role
            }

            const token=jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"3h"})
            user.token=token
            user.password=undefined

            const option={
                expiresIn: new Date(Date.now()+ 4*24*60*60*100),
                httpOnly:true
            }

            res.cookie("token",token,option).json({
                success:true,
                message:"Login Successfull",
                token,
                user
            })
        }
        else{
            return res.status(400).json({
                success:false,
                message:"Invaild Password"
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error occur while login!"
        })
    }
}

//timeSheet controllers

const addTask=async(req,res)=>{
    try {
        const {description,startTime,endTime,userId}=req.body
        if(!description){
            return res.status(400).json({
                success:false,
                message:"All fields are requierd"
            })
        }
        const newTask=await Task.create({description,startTime,endTime})
        const newTimeSheet= await TimeSheet.findOneAndUpdate({user:userId},{$push:{task:newTask}},{new:true})
        return res.status(200).json({
            success:true,
            message:"Task Added",
            data:newTask
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error occur while adding task!"
        })
    }
}

const editTask=async(req,res)=>{
    try {
        const {description,startTime,endTime,taskId}=req.body
        if(!description ){
            return res.status(400).json({
                success:false,
                
                message:"All fields are requierd"
            })
        }
        const newTask=await Task.findByIdAndUpdate({_id:taskId},{description,startTime,endTime})
        return res.status(200).json({
            success:true,
            message:"Task Added",
            data:newTask
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error occur while updating task!"
        })
    }
}

const submitTimeSheet=async(req,res)=>{
    try {
        const {userId,managerId}=req.body
        if(!userId || !managerId){
            return res.status(404).json({
                success:false,
                message:"Id are rquired!"
            })
        }

        const timeSheet=await TimeSheet.findOne({user:userId}).populate("task").exec()
        console.log(timeSheet);
        const manager=await Manager.findByIdAndUpdate({_id:managerId},{timeShet:timeSheet})
        if(!manager){
            return res.status(404).json({
                success:false,
                message:"Manager not found!"
            })
        }
        else{
            return res.status(200).json({
                success:true,
                message:"TimeSheet Submitted Succesfully",
            })
        }
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error occur while sending TimeSheet!"
        })
    }
}


const rateTheSheet=async(req,res)=>{
    try {
        const {managerId}=req.body
        const manager=await Manager.findById({_id:managerId}).populate({
            path:"timeShet",
            populate:[
                "task" ]
        }).exec()
        console.log(manager);
        const userId=manager.timeShet.user
        const getUser=await User.findById(userId)
        getUser.edit=false
        getUser.save()
        return res.status(200).json({
            success:true,
            message:"Rate succesfull"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error occur while reating!"
        })
    
    }
}

export {managerSingUp,signUp,login,addTask,submitTimeSheet,rateTheSheet,managerLogin}