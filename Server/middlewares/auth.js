const User=require("../models/User");
const jwt=require("jsonwebtoken");
// auth
exports.auth=async (req,resp,next)=>{
    console.log("a");
    try{
        // fetch the token from the req body

        //, middleware functions are powerful tools that you can use to intercept 
        //and manipulate requests and responses before they reach their final destination.

        /**Pass the Authorization header
         * Bearer   "token": 
         * "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJoYXZ
         * pc2FjaGRldmEzMTBAZ21haWwuY29tIiwiaWQiOiI2NWI3NzE5NjUzNGMxNDQxMDF
         * lNjU4NDciLCJhY2NvdW50dHlwZSI6IkFkbWluIiwiaWF0IjoxNzA2NTIxMDE1LCJleHA
         * iOjE3MDY2MDc0MTV9.BKVTvsqzA5B1u2Pse_NH0uthQS
         * 34vtPPeWFVHvGoQZ8"
         * 
         * In this replace function Bearer with space is replaced with "" so that we access 
         * the token**/


        const token=req.body.token || req.cookies.token || req.header("Authorisation").replace("Bearer ","");
        console.log(token);
        // if token is missing then return the response
        if(!token){
            return resp.status(402).json({
                success:false,
                message:"token is missing"
            })
        }

        console.log("d");
        // verify the token
        try{
            const decode= await jwt.verify(token,process.env.JWT_SECRET);
             console.log("decode",decode);
             req.user=decode;
             console.log("b");
            }catch(error){
                // verification issue
                return resp.status(402).json({
                    success:false,
                    message:"token is invalid"
                })
            }
            console.log("c");
            next();


    }catch(error){
        return resp.status(402).json({
            success:false,
            message:"something went wrong while validation"
        })

    }

}
// isStudent
exports.isStudent=async (req,resp,next)=>{
    try{
const userdetails=await User.findOne({email:req.user.email})
        if(userdetails.accounttype !=="Student"){
            return resp.status(400).json({
                success:false,
                message:"this is the protected route of student"
            })
        }
        next();
    }catch(error){
        return resp.status(402).json({
            success:false,
            message:"User role is not verified ,Please try again"
        })
    }
}

// isAdmin
exports.isAdmin=async (req,resp,next)=>{
    try{
        const userdetails=await User.findOne({email:req.user.email})

        if(userdetails.accounttype !=="Admin"){
            return resp.status(400).json({
                success:false,
                message:"this is the protected route of admin"
            })
        }
        next();
    }catch(error){
        return resp.status(402).json({
            success:false,
            message:"User role is not verified ,Please try again"
        })
    }
}

// isInstructor
exports.isInstructor=async (req,resp,next)=>{
    try{
        const userdetails=await User.findOne({email:req.user.email})

        if(userdetails.accounttype !=="Instructor"){
            return resp.status(400).json({
                success:false,
                message:"this is the protected route of instructor"
            })
        }
        next();
    }catch(error){
        return resp.status(402).json({
            success:false,
            message:"User role is not verified ,Please try again"
        })
    }
}