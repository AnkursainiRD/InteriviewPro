import mongoose from "mongoose";

const dbConnect=async()=>{
    try {
        await mongoose.connect(process.env.DATABASE_URL)
        console.log("Datbase Connected");
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

export default dbConnect;