const mongoose=require("mongoose");

const Sectionschema=new mongoose.Schema({
sectionname:{
    type:String
},
subsection:[{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:"Subsection"
}]

   
});

module.exports=mongoose.model("Section",Sectionschema);