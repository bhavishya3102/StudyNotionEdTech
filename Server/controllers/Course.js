const Course=require("../models/Course");
const CategoryModel=require("../models/Category");
const User=require("../models/User");
const { uploadImageToCloudinary}=require("../utils/imageuploader");
const Section = require("../models/Section");
const Subsection = require("../models/Subsection");
const { convertSecondsToDuration } = require("../utils/secToDuration");
const Courseprogress = require("../models/Courseprogress");
require("dotenv").config();

exports.createCourse=async (req,resp)=>{
    try{

        console.log("start123");
        const {coursename,coursedescription,whatyouwillLearn,Category,price,tag:_tag,instructions:_instructions,status}=req.body;
        console.log(Category);
        
// get thumbnail
const thumbnail=req.files.thumbnail;

// Convert the tag and Instructions from Stringify Array to Json Object

const  tag= JSON.parse(_tag);
const instructions=JSON.parse(_instructions);

// validation
if(!coursename|| !coursedescription || !whatyouwillLearn || !Category || !price || !thumbnail){
    return resp.status(402).json({
        success:false,
        message:"required fields are missing"
    })
}

//check for instructor
// get the userid from req object
const userid=req.user.id;
const Instructordetails=await User.findById({_id:userid});

if(!Instructordetails){
    return resp.status(402).json({
        success:false,
        message:"Instructor details are not found"
    })
}

console.log(status);
// check given Category is vaid ornot
const categorydetails=await CategoryModel.findById(Category);


console.log("category"+categorydetails);
if(!categorydetails){
    return resp.status(402).json({
        success:false,
        message:"category details are not found"
    })
}

// upload image to cloudinary
const thumbnailImage=await uploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME);
// create entry for new course
console.log(thumbnailImage);
const newCourse=await Course.create({
    instructor:Instructordetails._id,
    coursename:coursename,
    coursedescription:coursedescription,
    whatyouwillLearn:whatyouwillLearn,
    Category:categorydetails._id,
    thumbnail:thumbnailImage.secure_url,
    price:price,
    status:status,
    tag,
    instructions,

})
console.log("new course",newCourse);

// add the new course to the user schema
await User.findByIdAndUpdate({_id:Instructordetails._id},
    { $push:{ courses:newCourse._id } },
    { new:true  });

 // update Category schema
await CategoryModel.findByIdAndUpdate({_id:Category}, {$push:{course:newCourse._id}},{new:true});
            //return response
resp.status(200).json({
    success:true,
    data:newCourse,
    message:"new course added"
})

}



catch(error){
    resp.status(200).json({
        success:false,
        message:"some problem occured"
    })
    }
}

// get all courses
exports.showallcourses=async(req,resp)=>{
 try{
    const allcourses=await Course.find({},{coursename:true,
        coursedescription:true,
    price:true,
    instructor:true,
    ratingandreviews:true,
    studentEnrolled:true,
    thumbnail:true,
status:true});
    
    return resp.status(200).json({
        success:true,
        message:"fetch all the courses",
        allcourses
    })
 }catch(error){
    return resp.status(402).json({
        success:false,
        message:"cannot fetch all the courses"
    })
 }
}


// getcourse details
exports.getcoursedetails=async(req,resp)=>{
    try{
// get course id
const {courseid}=req.body;
const userid=req.user.id;
// console.log("course det",req.user);

// validate
if(!courseid){

    return resp.json({
        success:false,
        message:"course id is missing"
    })
}
// find details of course
const coursedetail=await Course.findOne({_id:courseid})
                            .populate({
                                path:"instructor",
                                populate:{
                                    path:"additionaldetails"
                                },
                            })
                            .populate("ratingandreviews")
                            .populate("Category")
                            .populate({
                                path:"coursecontent",
                                populate:{
                                    path:"subsection"
                                }
                            })
                          
                            .exec();


                          
let courseprogresscount=await Courseprogress.findOne({
    courseid:courseid,
    userid:userid
})

console.log("course Progress ",courseprogresscount)


     let totalDurationInSeconds=0;
     coursedetail.coursecontent.forEach((content)=>{
        content.subsection.forEach((subsection)=>{
          const timedurationInseconds=parseInt(subsection.timeDuration)
          totalDurationInSeconds+=timedurationInseconds  
        })
     })                       
const totalDuration=convertSecondsToDuration(totalDurationInSeconds);

        console.log("course Detail",coursedetail);                    
// return response
return resp.status(200).json({
    success:true,
    message:"course details fetched successfully",
    data:{
        coursedetail,
        totalDuration,
        completedVideos:courseprogresscount?.completedvideos
        ? courseprogresscount?.completedvideos:[],
    }
})
}catch(error){
    return resp.status(500).json({
        success:false,
        message:"error in fetching course details"
    })  

    }
}


// edit course
exports.editCourse=async (req,resp)=>{
 try{
    console.log("ccccccc");
    const { courseid }=req.body;
    console.log(courseid);
    const updates=req.body;
    const course=await Course.findById(courseid);

    if(!course){
        return resp.status(404).json({
            error:"course not found"
        })
    }
    if(req.files){
        const thumbnail=req.files.thumbnail;
        const thumbnailImage=await uploadImageToCloudinary(
            thumbnail,
            process.env.FOLDER_NAME
        )
        course.thumbnail=thumbnailImage.secure_url;
    }

    // update only the fields that are present in the request
    for(const key in updates){
        if(updates.hasOwnProperty(key)){
            if(key==="tag"|| key==="instructions"){
                course[key]=JSON.parse(updates[key]);
            }
            else{
                course[key]=updates[key];
            }
        }
    }
    await course.save();
const updatecourse=await Course.findOne({
    _id:courseid,

}).populate({
    path:"instructor",
    populate:{
        path:"additionaldetails"
    },
})
.populate("ratingandreviews")
.populate("Category")
.populate({
    path:"coursecontent",
    populate:{
        path:"subsection"
    }
})
.exec();

resp.json({
    success:true,
    message:"course updated successfully",
    data:updatecourse
})


 }
 catch(error){
resp.status(500).json({
    success:false,
    message:"internal server error",
    error: error.message
})
}
}



exports.getInstructorCourses=async (req,resp)=>{
    try{
        console.log("a");
        const instructorid=req.user.id;
        console.log(instructorid);

    // find all courses belonging to the instructor
    const instructorCourses=await Course.find({instructor:instructorid})
    .sort({createdate:-1})

    // return the instructor courses
    resp.status(200).json({
        success:true,
        data:instructorCourses
    })

    }catch{
     
        resp.status(500).json({
          success: false,
          message: "Failed to retrieve instructor courses",
          error: error.message,
        })
      }
}

//Delete the Course

exports.deleteCourse=async (req,resp)=>{
    try{

        const {courseid}=req.body;
        // find the course
        const course=await Course.findById(courseid);
        if(!course){
            return resp.status(404).json({
                message:"course not found"
            })
        }

        // unenroll all the students from the courses
        const studentsEnrolled=course.studentEnrolled
        for(const studentid of studentsEnrolled){
            await User.findByIdAndUpdate(studentid,{
                $pull:{courses:courseid},
            })
        }

        // delete sections and subsections

        const courseSections=course.coursecontent
        for(const sectionid of courseSections){
            // delete subsections of the each section
            const section=await Section.findById(sectionid)
            if(section){
                const subsections=section.subsection
                for(const subsectionid of subsections){
                    await Subsection.findByIdAndDelete(subsectionid)
                }
    
            }
            // delete the section
            await Section.findByIdAndDelete(sectionid)
            
        }
        // delete the course
        await Course.findByIdAndDelete(courseid);
        return resp.status(200).json({
            success:true,
            message:"course deleted successfully"
        })





    }catch(error){
        return resp.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
          })
        
    }
}
