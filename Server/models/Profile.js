const mongoose=require("mongoose");

const profileschema=new mongoose.Schema({
    gender:{
        type:String,
    },
    dateofbirth:{
        type:String,

    },
    about:{
        type:String,
        trim:true
    },
    contactno:{
        type:Number,
        trim:true
    }
});

module.exports=mongoose.model("Profile",profileschema);