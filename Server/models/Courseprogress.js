const mongoose=require("mongoose");

const courseprogressschema=new mongoose.Schema({
    courseid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    },
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    completedvideos:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Subsection"
    }]
   
});

module.exports=mongoose.model("Courseprogress",courseprogressschema);