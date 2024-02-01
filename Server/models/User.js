const mongoose=require("mongoose");
const userschema=new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        trim:true
    },
    lastname:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
       
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    active: {
        type: Boolean,
        default: true,
    },
    approved: {
        type: Boolean,
        default: true,
    },
    accounttype:{
        type:String,
        required:true,
        enum:["Admin","Student","Instructor"]
    },
    additionaldetails:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Profile"
    },
    courses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    }],
    token:{
        type:String,

    },
    resetPasswordExpires:{
        type:Date,
    },
    image:{
        type:String,
        required:true
    },
    courseprogress:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Courseprogress"
    }]

})

module.exports=mongoose.model("User",userschema);