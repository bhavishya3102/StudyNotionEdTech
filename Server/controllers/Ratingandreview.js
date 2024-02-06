const User=require("../models/User");
const Course=require("../models/Course");
const RatingandReview=require("../models/RatingandReview");
const { default: mongoose } = require("mongoose");

// Create Rating and Review
exports.createrating=async(req,resp)=>{
    try{
// get the data courseid,userid,review,rating
const {courseid,rating,review}=req.body;
const userid=req.user.id;
// perform validation


if(!courseid || !rating || !review ||!userid){
    return resp.status(402).json({
        success:false,
        message:"Required fields are missing"
    })
}

// check user is enrolled or not
const userdetails=await Course.findOne({_id:courseid
        ,studentEnrolled: { $elemMatch: {$eq:userid}}});  
         
console.log("user",userdetails)
  if(!userdetails){
    return resp.status(402).json({
        success:false,
        message:"Student is not enrolled in the course"
    })
  }
  
  //check user is already reviewed the course ornot
  const reviewdetails=await RatingandReview.findOne({
    user:userid,
    course:courseid
  })
// console.log("review",reviewdetails)

  if(reviewdetails){
    return resp.status(402).json({
        success:false,
        message:"Student is already reviewed the course"
    })
  }
  // create rating
  const ratingdetails=await RatingandReview.create({user:userid,
    course:courseid,
    rating:rating,
    review:review});
    
  
    if(!ratingdetails){
        return resp.status(402).json({
            success:false,
            message:"error occured"
        })
    }
   
    // update the rating in course schema
    await Course.findByIdAndUpdate(courseid,{
        $push:{
            ratingandreviews:ratingdetails._id
        }
    })

// return response
return resp.status(200).json({
    success:true,
    ratingdetails,
    message:"Student successfully review the course"
})

    }catch(error){
        return resp.status(402).json({
            success:false,
            message:error.message
        })
    }
}


// get average rating
exports.averagerating=async(req,resp)=>{
    try{
// get user id
const courseid=req.body;

// find average rating

/**
 * The $match stage filters documents based on given courseid          -1stage
 * The $group stage groups the filtered documents.                  --2stage
 * The $avg operator is used to calculate the average of the rating field for all the grouped documents.
 * The result array will contain a single document
 */
const result=await RatingandReview.aggregate([
    {
        $match:{
            course:new mongoose.Types.ObjectId(courseid)
        },
       },
       {
        $group:{
            _id:null,
            averageRating:{$avg:"$rating"},
        }
       }
]);

if(result.length>0){
    return resp.status(200).json({
        success:true,
        averageRating:result[0].averageRating
    })
}



// if length is 0 then no user rate the course
return resp.status(402).json({
    success:false,
    message:"Averagerating is 0,no rating given now till now"
})
    }catch(error){
        return resp.status(402).json({
            success:false,
            message:error.message
        })
    }
}

// get all rating and reviews


// when we populate course field in Rating and Review model then show(select) only course name 
exports.allratingreviews=async(req,resp)=>{
    try{
// find all rating and  reviews
const allrating=await RatingandReview.find({})
                                .sort({rating:"desc"})
                                .populate({
                                    path:"course",
                                    select:"coursename"
                                })
                                .populate({
                                    path:"user",
                                    select:"firstname lastname email image"
                                }).exec();


    // return response
    return resp.status(200).json({
        success:true,
        message:"Find all rating and reviews",
        allrating
    })
    }catch(error){
        return resp.status(402).json({
            success:false,
            message:"cannot find all rating and reviews"
        })
    }
}
