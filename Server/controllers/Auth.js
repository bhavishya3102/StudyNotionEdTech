const user=require("../models/User");
const otpgenerator=require("otp-generator");
const OTP=require("../models/Otp");
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken");

const Profile=require("../models/Profile");
const mailsender=require("../utils/mailSender");
const  passwordUpdated  = require("../Mail/Templates/passwordUpdate");

require("dotenv").config();
// send otp

exports.sendOtp= async (req,resp)=>{
try{
        // fetch email from the request body
        const {email}=req.body;

        // check user is already exists

        /**The findOne() method finds and returns one document that matches the given
         *  selection criteria. If multiple documents satisfy the given query expression,
         *  then this method will return the first document according to the natural order
         * */
        const checkuser=await user.findOne({email:email});
        //to be used in case of signup
    
        // if user already exists then return the response
        if(checkuser){
            return resp.status(402).json({
                success:false,
                message:"user is already exists"
            })
        }
    
        // generate otp
        var otp=otpgenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false
        });
    
        // check unique otp or not
        
      // This mechanism seems to ensure that each OTP used is unique within the context of the database.
        
      const result=await OTP.findOne({otp:otp});
        console.log("OTP", otp);
		console.log("Result", result);
        while(result){
            otp=otpgenerator.generate(6,{
                upperCaseAlphabets:false,
               
            });
            
        }
        const otppayload={email,otp};


        // entry create karne se pehle otp ka pre middleware chll jayga jisse vo generate otp ko given email
        // par send kardega with the help of mail sender then after entry create hoge otp schema me
    
        // create entry for otp
        const otpbody=await OTP.create(otppayload);
        console.log(otpbody._id);
    
        // return response successfull
        resp.status(200).json({
            success:true,
            message:"Otp send successfully",
            otp
        })
       
} catch(error){
  return   resp.status(400).json({
        success:false,
        message:"Otp send failed",
    
    })       
}

}

// sign up
exports.signup=async (req,resp)=>{
  try{
    // data fetch from the request body
    const {firstname,lastname,email
      ,password,confirmpassword,
      accounttype,otp
    }=req.body;
    
    
    // perform validation
    if(!firstname|| !email || !password || !confirmpassword || !otp){
      return resp.status(402).json({
        success:false,
        message:"required details missing"
      })
    }
    
    // password match confirm and password
  if(password !==confirmpassword){
    return resp.status(402).json({
        success:false,
        message:"password not match with confirm password"
    })
  }
  // check user already exists or not
  const checkemail=await user.findOne({email});
  if(checkemail){
    return resp.status(402).json({
        success:false,
        message:"user is already exists"
    })
  }

  // verify the otp if it is correct or not given by the user
  // find most recent otp stored for the user in the otp database
  const recentotp=await OTP.find({email:email}).sort({createdate:-1}).limit(1);
  console.log(recentotp);
  // validate otp
  if(recentotp.length==0){
    return resp.status(402).json({
      success:false,
      message:"Otp not found"
    })
  }else if(otp !==recentotp[0].otp)
  {
    return resp.status(402).json({
      success:false,
      message:"Invalid otp"
    })
  }
  //else  it means otp is correct
  // hash password
  
  const hashpassword=await bcrypt.hash(password,10);
  

      // Create the user
      let approved = ""
      accounttype === "Instructor" ? (approved = true) : (approved = false)

  // create entry in the database
  
  const profiledetails=await Profile.create({
    gender:null,
    dateofbirth:null,
    about:null,
    contactno:null
  });
  
  const userdata=await user.create({
    firstname,lastname,email,password:hashpassword,accounttype,approved:approved,
    additionaldetails:profiledetails._id,
    image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstname} ${lastname}`
  })
  console.log("user:"+userdata._id);
  // return response
  return resp.status(200).json({
    success:true,
    message:"user is registered successfully",
    userdata
  })

}
catch(error){
    return resp.status(402).json({
        success:false,
        message:"user cannot be registered"
      })
}   
}

 // Login
exports.login=async (req,resp)=>{
  try{
// get data from the request body
const {email,password}=req.body;
// validation on data
if(!email || !password){
  return resp.status(400).json({
    success:false,
    message:"required entries is missing"
  })
}
// check user is registered or not
const checkuser=await user.findOne({email}).populate("additionaldetails");
if(!checkuser){
  return resp.status(400).json({
    success:false,
    message:"user is not registered ,first registered"
  })
}
// password matching
if(await bcrypt.compare(password,checkuser.password)){
  // generate token
  const payload={
    email:checkuser.email,
    id:checkuser._id,
    accounttype:checkuser.accounttype
  }

//Payload- The payload typically contains
// information about the user or any other data you want to encode in the token

//JwtSecret- The second argument is the secret key used to sign the token
// sign method is used to generate the token

  const token=jwt.sign(payload,process.env.JWT_SECRET,{
  expiresIn:"24h"
  });
  
  checkuser.token=token;
  checkuser.password=undefined; // for privacy purpose
// create cookie and send response



/**Date.now() returns the current timestamp in milliseconds.
3 * 24 * 60 * 60 * 1000 calculates the total milliseconds for 3 days.
 (3 days * 24 hours/day * 60 minutes/hour * 60 seconds/minute * 1000 milliseconds/second) 
 
 

  When httpsOnly is set to true, it means that the browser will only send the
   cookie over HTTPS connections, not over unsecured HTTP connections. 
   This is a security measure to protect sensitive information (like session tokens) 
   from being intercepted in transit.
 
 */
const options={
expires:new Date(Date.now()+3*60*60*1000),
httpsOnly:true
}


/** this code sets an HTTP cookie named "token" in the server's response.
 * The cookie contains the value of the JWT (token) and is configured with 
 * certain options such as an expiration date and the requirement for it to be
 *  sent only over HTTPS */

resp.cookie("token",token,options).status(200).json({
success:true,
token,
checkuser,
message:"user is successfully login"
})
}
else{
 return resp.status(401).json({
    success:false,
    message:"Password not matched ,try again"
  });
}
}
catch(error){
 return resp.status(402).json({
    success:false,
    message:"login fail ,please try again"
  })

}
}

// change password

exports.changepassword=async(req,resp)=>{
  try{
// get user data from req.user
const userdetails=await user.findById({_id:req.user.id});
// get data from the req body
const {oldpassword,newpassword}=req.body;
// get old password,new password and confirm password match
// validate old password
const oldpassmatch=await bcrypt.compare(oldpassword,userdetails.password);
if(!oldpassmatch){
  return resp.status(402).json({
    success:false,
    message:"Password is incorrect"
  })
}

// Match new password and confirm password
// if(newpassword!=confirmpassword){
//   return resp.status(402).json({
//     success:false,
//     message:"The Password and confirm password is not match"
//   })
// }

// update the password on db
// for security purpose we encrypt the password
const encryptpass=await bcrypt.hash(newpassword,10);
const updateuser=await user.findByIdAndUpdate({_id:req.user.id},
  {password:encryptpass},{new:true});
// send mail update the password
try{
  const sendmail=await mailsender(updateuser.email,
    passwordUpdated(updateuser.email,
      `Password updated Successfully for ${updateuser.firstname} ${updateuser.lastname}`)
  )
}catch(error){
  return resp.status(402).json({
    success:false,
    message:"error occurred while sending mail"
  })
}

// send response
return resp.status(200).json({
  success:true,
  message:"Password Updated Successfully"
})
  }catch(error){
    return resp.status(402).json({
      success:false,
      message:error.message
    })
  }
}
  