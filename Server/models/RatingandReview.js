const mongoose=require("mongoose");

const ratingandreviewschema=new mongoose.Schema({
user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
},
rating:{
    type:Number
},
review:{
    type:String,
    required:true
},
course:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Course",
    required:true
}
   
});

module.exports=mongoose.model("RatingAndReview",ratingandreviewschema);