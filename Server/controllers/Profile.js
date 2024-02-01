const Course = require("../models/Course");
const Courseprogress = require("../models/Courseprogress");
const Profile=require("../models/Profile");
const User=require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageuploader");
const { convertSecondsToDuration } = require("../utils/secToDuration");

exports.updateprofile=async(req,resp)=>{
    try{
// fetch data
const {dateofbirth="",gender,contactno,about="",firstname="",lastname=""}=req.body;
// get userid
// when the user login then the user authenticate with the basis of
// token and at the auth the decode token(details)  is passed in 
// req.user so we fetch the decode data of user 
const userid=req.user.id;
console.log("update",req.user);
// // validation
// if(!contactno || !gender || !userid){
//     return resp.status(402).json({
//         success:false,
//         message:"fields are empty"
//     })
// }
// find profile
const userdetails=await User.findById(userid);
const profileid=userdetails.additionaldetails;
const profiledetails=await Profile.findById({_id:profileid});
// update profile in User schema

const user=await User.findByIdAndUpdate(userid,{firstname,lastname});
await user.save();

profiledetails.gender=gender;
profiledetails.contactno=contactno;
profiledetails.about=about;
profiledetails.dateofbirth=dateofbirth;
await profiledetails.save();

const updateuser=await User.findById(userid).populate("additionaldetails").exec();
// return response
return resp.status(200).json({
    success:true,
    message:"update profile",
    updateuser

})
    }
    catch(error){
        return resp.status(500).json({
            success:false,
            message:"find error in update profile"
        })
    }
}

// Deleted account
exports.deleteaccount=async(req,resp)=>{
    try{
// find the userid
const userid=req.user.id;
const user=await User.findById({_id:userid});
// validation
if(!user){
    return resp.status(402).json({
        success:false,
        message:"cannot find right userid"
    })
}
// delete profile from user schema
await Profile.findByIdAndDelete(user.additionaldetails);
// delete user
await User.findByIdAndDelete(userid);
// return response
return resp.status(200).json({
    success:true,
    message:"delete user"
})
    }catch(error){
        return resp.status(500).json({
            success:false,
            message:"error in delete userprofile"
        })

    }
}

// get all details
exports.getalluserdetails=async(req,resp)=>{
    try{
// get userid
const userid=req.user.id;
// find userid
console.log("a");
console.log(userid);
const userdetails=await User.findById({_id:userid})
.populate("additionaldetails").exec();
console.log("b");
console.log(userdetails);
// return response
return resp.status(200).json({
            success:true,
            message:"get all details of user",
            userdetails

        })
        
    }catch(error){
        return resp.status(500).json({
            success:false,
            message:"error in find detail of user"
        })
        
    }
}

//update display picture
exports.updatedisplaypicture=async(req,resp)=>{
    try{
// get the profile picture from request
const displaypicture=req.files.displaypicture;

// get the user id from req object
const userid=req.user.id;
// upload to cloudinary
const uploaddisplaypic=await uploadImageToCloudinary(displaypicture,process.env.FOLDER_NAME,1000,1000);

// update in the user schema
const updateuser=await User.findByIdAndUpdate({_id:userid},
    {image:uploaddisplaypic.secure_url},{new:true});
//return response 
return resp.status(200).json({
    success:true,
    message:"profile picture is updated",
    data:updateuser
})
    }catch(error){
return resp.status(500).json({
            success:false,
            message:"profile picture is fail to update"
        })
    }
}


// get enrolled courses
exports.getenrolledcourses=async(req,resp)=>{
    try{
const userid=req.user.id;
console.log("enr",req.user);
let userdetails=await User.findById({_id:userid})
                            .populate({
                                path:"courses",
                                populate:{
                                    path:"coursecontent",
                                    populate:{
                                        path:"subsection"
                                    }
                                }
                            }).exec();

if(!userdetails){
    return resp.status(400).json({
        success: false,
        message: `Could not find user with id: ${userdetails}`,
      })
} 
// console.log("uu",userdetails.toObject()) 


// to find the progress percentage of enrolled course
// formula is (completevideos/totalvideos)*100


// console.log("vv",userdetails)
userdetails=userdetails.toObject();
var subsectionLength=0;
for(var i=0;i<userdetails.courses.length;i++){
    let totalDurationInSeconds=0;
    subsectionLength=0;
    // loop upto total no of sections in course
    for(var j=0;j<userdetails.courses[i].coursecontent.length;j++){
        // total duration in seconds
        totalDurationInSeconds+=userdetails.courses[i].coursecontent[j].subsection
        .reduce((acc,curr)=> acc+parseInt(curr.timeDuration),0)
        console.log("total",totalDurationInSeconds)
// set the time duration in duration 
        userdetails.courses[i].timeDuration=convertSecondsToDuration(totalDurationInSeconds)
/// calculate subsection length
        subsectionLength+=userdetails.courses[i].coursecontent[j].subsection.length;
console.log("subsec length",subsectionLength)

    }
let courseprogresscount=await Courseprogress.findOne({
    userid:userid,
    courseid:userdetails.courses[i]._id
})

// find the length of complete videos
courseprogresscount=courseprogresscount.completedvideos.length;
console.log("course prog",courseprogresscount)
if(subsectionLength==0){
    userdetails.courses[i].progressPercentage=100
}
else{
    // to make it upto 2 decimal point
    const multiplier=Math.pow(10,2)
    userdetails.courses[i].progressPercentage=Math.round(
        (courseprogresscount/subsectionLength)*100*multiplier)/multiplier

    


}

}

if(!userdetails){
    return resp.status(400).json({
        success: false,
        message: `Could not find user with id: ${userDetails}`,
      })
}
return resp.status(200).json({
success:true,
data:userdetails.courses,
message:"get the enrolled courses"

})
}catch(error){
    return resp.status(500).json({
        success:false,
        message:error.message
    })
    }
}


exports.instructorDashboard=async (req,resp)=>{
    try{
        // this stores the all course created by  Instructor
       const courseDetails=await Course.find({instructor:req.user.id})

       // this stores the array of object ,object stores
       // course data with stats
       const courseData=courseDetails.map((course,i)=>{
        const totalStudentsEnroll=course.studentEnrolled.length;
        const totalAmountGenerate=totalStudentsEnroll*course.price;

        // create a new object with additional fields
        const courseDataWithStats={
       _id:course._id,
       coursename:course.coursename,
       coursedescription:course.coursedescription,
       totalStudentsEnroll,
       totalAmountGenerate
        }

        return courseDataWithStats;
       })
resp.status(200).json({
    success:true,
    courses:courseData
})

    }catch(error){
        console.log(error);
        resp.status(500).json({
            message:"Internal server error"
        })
    }
}