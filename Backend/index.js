import dotenv from "dotenv"
import dbConnect from "./config/Database.js"
import app from "./app.js"
dotenv.config({
    path:'./.env'
})

dbConnect()
.then(()=>{
    app.listen(process.env.PORT || 3000,()=>{
        console.log("Server Started");
    })
})
.catch((error)=>{
    console.log(error);
})