const mongoose=require("mongoose");
const mailSender = require("../utils/mailSender");
const emailtemplate=require("../Mail/Templates/emailVerification");
const getExpiryTime=require("../utils/getExpiryTime")

// for using blackbox ai in vs code
// how to create model in express?

const Otpschema=new mongoose.Schema({
email:{
    type:String,
    required:true
},
otp:{
    type:String,
    required:true
},
createdate:{
    type:Date,
    default:Date.now(),
    expires:getExpiryTime
}

   
});

// A Function to send mail
// use premiddleware --otp anne se pehle email se verification ho
async function sendverification(email,otp){
    try{

        const mailresponse=await mailSender(email,"Verification Email",emailtemplate(otp));
        console.log("email send successfully",mailresponse);
    }catch(error){
console.log("error occured while sending email",error);
throw error;
    }
}

/**this code is a pre-save middleware for a schema called Otpschema.
 *  It triggers before saving a document, 
 * and its main purpose is to send a verification, likely an OTP, 
 * using the email and OTP values present in the document being saved.
 *  Once the verification is sent, it proceeds to the next middleware or
 *  the save operation. */
Otpschema.pre("save",async function(next){
    await sendverification(this.email,this.otp);
    next();
})

module.exports=mongoose.model("Otp",Otpschema);