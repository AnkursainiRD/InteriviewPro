import jwt from "jsonwebtoken";

const auth=async(req,res,next)=>{
    
        const token=req.cookies.token || req.body.token || req.header('Authorization').replace('Bearer ',"")
        if(!token){
            return res.status(404).json({
                success:false,
                message:"Token missing!"
            })
        }
    try {
        const decode=await jwt.verify(token,process.env.JWT_SECRET)
        req.user=decode

        next()
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Token Error"
        })
    }
}

const employee=async(req,res,next)=>{
    try {
        if(req.user.role!=="employee")
        {
            return res.status(401).json({
                success:false,
                message:"Unatuhorized access request!"
            })
        }
        next()
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Token Error"
        })
    }
}


const manager=async(req,res,next)=>{
    try {
        if(req.user.role!=="manager")
        {
            return res.status(401).json({
                success:false,
                message:"Unatuhorized access request!"
            })
        }
        next()
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Token Error"
        })
    }
}

export {manager,auth,employee}