const mongoose=require("mongoose");
const mailSender = require("../utils/mailSender");
const emailtemplate=require("../Mail/Templates/emailVerification");

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
    expires:5*60  // 5min me expire
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


Otpschema.pre("save",async function(next){
    await sendverification(this.email,this.otp);
    next();
})

module.exports=mongoose.model("Otp",Otpschema);