const mongoose=require("mongoose");
const Subsection = require("../models/Subsection");
const Courseprogress = require("../models/Courseprogress");


// this controller is used to track the completed
// videos of particular course of user
exports.updateCourseProgress=async (req,resp)=>{
    const {courseid,subsectionid}=req.body;
    const userid=req.user.id;

    try{
        // check if subsection is valid
        const subsection=await Subsection.findById(subsectionid)
        if(!subsection){
            return resp.status(404).json({
                error:"Invalid subsection"
            })
        }
       
        // find the course progress document for the userid and 
        // courseid
        // first initialized the course Progress value at the time of enrolled student
        //when the user purchase the course and enrolled in it
        
        // so we get the data of particular user in course progress
        
        let courseProgress=await Courseprogress.findOne({
            userid:userid,
            courseid:courseid
        })

        if(!courseProgress){
            // if courseProgress doesnot exist ,return response
            return resp.status(404).json({
                success:false,
                message:"Course Progress does't exist "
            })
        }
        else{
            // course Progress exist ,check if subsection id is already include or not 
            // that is subsection is already completed
            if(courseProgress.completedvideos.includes(subsectionid))
            {
                return resp.status(400).json({ error:" Subsection is already completed"})
            }
            // push the subsection into the completed videos array
            courseProgress.completedvideos.push(subsectionid)
        }

        // save and update course progress
        await courseProgress.save()

        return resp.status(200).json({
            success:true,
            message:"course Progress updated"
        })

    }catch(error){
        return resp.status(500).json({
            error:"Internal Server error"
        })
    }
}