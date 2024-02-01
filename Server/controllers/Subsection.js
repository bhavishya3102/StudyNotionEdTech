const Subsection=require("../models/Subsection");
const Section=require("../models/Section");
const {uploadImageToCloudinary}=require("../utils/imageuploader");
const { response } = require("express");

exports.createsubsection=async (req,resp)=>{
    try{
        console.log("create");
// fetch data from the request body
const {sectionid,title,description}=req.body;
console.log(sectionid);
console.log(title);
console.log(description);


// extract file/video
const video=req.files.video;
console.log(video);
// validation
if(!title  ||!description || !video){
    return resp.status(402).json({
        success:false,
        message:"required fields are empty"
    })
}

// upload video to cloudinary
const uploaddetails=await uploadImageToCloudinary(video,process.env.FOLDER_NAME);
// create subsection
const newsubsection=await Subsection.create({
    title:title,
description:description,
videourl:uploaddetails.secure_url,
timeDuration:uploaddetails.duration
})

console.log(newsubsection);
// update section with this subsection
const updatesec=await Section.findByIdAndUpdate(sectionid,{$push:{subsection:newsubsection._id}},{new:true}).populate("subsection").exec();

// return response
return resp.status(200).json({
    success:true,
    message:"new subsection is created",
    data:updatesec
})

    }catch(error){
        return resp.status(500).json({
            success:false,
            message:"new subsection is failed to create"
        })
        
    }
}

//update subsection
exports.updatesubsection=async (req,resp)=>{
    try{
const {subsectionid,sectionid,title,description}=req.body;

console.log(subsectionid);
console.log(sectionid);
console.log(title);
const subSection = await Subsection.findById(subsectionid);


  
if (!subSection) {
  return resp.status(404).json({
    success: false,
    message: "SubSection not found",
  })
}
// validation
if(title!==undefined){
    subSection.title=title
}
if(description!==undefined){
    subSection.description=description
}

if(req.files && req.files.video!==undefined)
{
    const video=req.files.video
    // upload video to cloudinary
const uploaddetails=await uploadImageToCloudinary(video,process.env.FOLDER_NAME)
subSection.videourl=uploaddetails.secure_url
subSection.timeDuration=uploaddetails.duration
}

// update subsection
await subSection.save();


//update in the course schema and update the subsection will done automatically
const updatedSection = await Section.findById(sectionid).populate(
    "subsection"
  )
// return response
return resp.status(200).json({
    success:true,
    message:"update section successfully",
    data:updatedSection
})
    }catch(error){
        return resp.status(500).json({
            success:false,
            message:"fail to update subsection"
        })
    }
}


// delete subsection
exports.deletesubsection=async(req,resp)=>{
    try{
        // fetch data
const {subsectionid,sectionid}=req.body;
// delete subsection
const subSection=await Subsection.findByIdAndDelete(subsectionid);
// update section
await Section.findOneAndUpdate({_id:sectionid},{
    $pull:{
        subsection:subsectionid
    }
})

if (!subSection) {
    return resp
      .status(404)
      .json({ success: false, message: "SubSection not found" })
  }

   // find updated section and return it
   const updatedSection = await Section.findById(sectionid).populate(
    "subsection"
  )

// return response
return resp.status(200).json({
    success:true,
    message:"delete subsection",
    data:updatedSection
})
    }catch(error){
        return resp.status(500).json({
            success:false,
            message:"delete subsection failed"
        })
    }
}