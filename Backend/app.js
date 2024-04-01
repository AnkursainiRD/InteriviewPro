import express from "express"
import cookieParser from "cookie-parser"
import cors from 'cors'
import router from "./routes/userRoute.js"
const app=express()


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    methods:["POST","GET","PUT","DELETE"],
    credentials:true
}))

app.use("/api/v1/user",router)
app.get("/",function(req,res){
    res.send("Working Properly")
})

export default app;