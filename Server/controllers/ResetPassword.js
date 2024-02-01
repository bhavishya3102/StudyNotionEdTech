const User=require("../models/User");
const mailsender=require("../utils/mailSender");
const bcrypt=require("bcrypt");
const crypto=require("crypto");

// Reset Password token
exports.resetPasswordtoken=async (req,resp)=>{
    try{
        
    // get email from the request body
    const {email}=req.body;
    // check user for this email,email validation
    const user=await User.findOne({email});
    if(!user){
        return resp.status(400).json({
            success:false,
            message:"your email isnot registered yet "
        })
    }
    // generate token-- use crypto package to generate the token
    const token=crypto.randomUUID();


    // update the user by addding token and expirydate
    const updateuser=await User.findOneAndUpdate({email:email},{
        token:token,
        resetPasswordExpires:Date.now()+5*60*1000 //5hrs
    },{new:true});
    // create the url -- frontend url that is use portno of frontend url
    const url=`http://localhost:3000/update-password/${token}`;
    // send the email containing the url
    await mailsender(email,"password resent link",
    `password resent link:${url}`);
    // return response
    return resp.status(200).json({
        success:true,
        message:"Email send successfully"
    })
    }catch(error){

        return resp.status(500).json({
            success:false,
            message:"Something went wrong!!!"
        })
    }
   
}

// reset password
exports.resetpassword=async(req,resp)=>{
    // fetch the data
    const {password,confirmPassword,token}=req.body;
    // validation
    if(password != confirmPassword){
        return resp.status(402).json({
            success:true,
            message:"Password not Matching"
        })
    }
    // get user details from the db using token
    const userdetails=await User.find({token:token});
    // if no entry -invalid token
    if(!userdetails){
        return resp.status(403).json({
            success:false,
            message:"Token is invalid"
        })
    }
    // token time check
    if(Date.now()>userdetails.resetPasswordExpires){
        return resp.status(402).json({
            success:false,
            message:"Token is expired"
        })
    }
    // hash password
    const hashpassword=await bcrypt.hash(password,10);
    // password update
    await User.findOneAndUpdate({token},{password:hashpassword},{new:true});
    // return response
    resp.status(200).json({
        success:true,
        message:"Password reset successfully"
    });
}