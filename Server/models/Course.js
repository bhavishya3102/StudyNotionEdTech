const mongoose=require("mongoose");

const courseschema=new mongoose.Schema({
  coursename:{
    type:String
  },
  coursedescription:{
    type:String
  },
  instructor:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  },
  whatyouwillLearn:{
    type:String
  },
  coursecontent:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Section"
  }],
  ratingandreviews:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"RatingAndReview"
  }],
  price:{
    type:Number
  },
  thumbnail:{
    type:String
  },
  Category:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Category",

  },
  tag: {
    type: [String],
    required: true,
  },
studentEnrolled:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
}],
instructions: {
  type: [String],
},
status: {
  type: String,
  enum: ["Draft", "Published"],
},
createdAt: { type: Date, default: Date.now },
   
});

module.exports=mongoose.model("Course",courseschema);