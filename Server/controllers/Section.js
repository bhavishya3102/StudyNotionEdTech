const Section =require("../models/Section")
const Course=require("../models/Course");
const Subsection=require("../models/Subsection");

exports.createsection=async (req,resp)=>{
    try{
// data fetch
const {sectionname,courseid}=req.body;
// data validation
if(!sectionname || !courseid){
    return resp.status(402).json({
        success:false,
        message:"required fields are missing"
    })
}
// create section
const newsection=await Section.create({sectionname});
//update section in course schema
const updatecoursedetails=await Course.findByIdAndUpdate({_id:courseid},{$push: {coursecontent:newsection._id}},{new:true})
.populate({
    path:"coursecontent",
    populate:{
        path:"subsection"
    }
}).exec();
// return response
return resp.status(200).json({
    success:true,
    message:"section created successfully",
    updatecoursedetails
})

    }catch(error){
        return resp.status(500).json({
            success:false,
            message:"section not created successfully"
        })
    }
}

// update section
exports.updatesection=async(req,resp)=>{
    try{
// data input
const {sectionname,sectionid,courseid}=req.body;
// data validation
if(!sectionname || !sectionid){
    return resp.status(402).json({
        success:false,
        message:"missing required details"
    })
}
// update data
// const updatedsec=await Section.findByIdAndUpdate({_id:sectionid},{sectionname:sectionname},{new:true});
const updatedsec=await Section.findByIdAndUpdate(sectionid,{sectionname},{new:true});


// update course-
const course=await Course.findById(courseid)
.populate({
    path:"coursecontent",
    populate:{
        path:"subsection"
    }
})
// return response
return resp.status(200).json({
    success:true,
    message:"section updated successfully",
    data:course
})
    }catch(error){
        return resp.status(500).json({
            success:false,
            message:"problem in updated section"
        })
    }
}


//  delete section
exports.deletesection=async(req,resp)=>{
    try{
// get sectionid
const {sectionid,courseid}=req.body;


// update course schema
await Course.findByIdAndUpdate({_id:courseid},{
    $pull:{
        coursecontent:sectionid
    }
})


const section=await Section.findById(sectionid);
if(!section){
    return resp.status(404).json({
        success:false,
        message:"section is not found"
    })
}




// delete the associated subsections
await Subsection.deleteMany({_id:section.subsection});

await Section.findByIdAndDelete(sectionid);

// find the updated course
const course=await Course.findById(courseid)
.populate({
    path:"coursecontent",
    populate:{
        path:"subsection"
    },
}).exec();
// return response
return resp.status(200).json({
    success:true,
    message:"section delete successfully",
    data:course,
})
    }catch(error){
        return resp.status(500).json({
            success:false,
            message:"problem in deleted section"
        })
    }
}