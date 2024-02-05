const User=require("../models/User");
const ConfirmationEmail=require("../Mail/Templates/ConfirmationEmail");
const mailsender=require("../utils/mailSender");

// send mail for contact us 
// pending
exports.mailtoenrollstudent=async(req,resp)=>{
    try{
    // get userid
    // const {userid}=req.user.id

    // fetch the details from userid
    const userdetails=await User.find({_id:req.user.id});
    
    // send mail to enrolled student
    await mailsender(userdetails.email,"confirmation email","confirmation email");
   // send mail to admin when student is enrolled
   await mailsender(process.env.MAIL,"user details",`user details: ${userdetails}`);
     // return response
    return resp.status(200).json({
        success:true,
        message:"send the mail to enrolled student"
    })
    }catch(error){
        return resp.status(500).json({
            success:false,
            message:" failed to send the mail to enrolled student"
        })
    }

}
