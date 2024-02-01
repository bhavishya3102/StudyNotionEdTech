const mongoose=require("mongoose");
require("dotenv").config();

exports.connectdb=()=>{
    mongoose.connect(process.env.URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(console.log("database is connect successfully"))
    .catch(error=>{ 
        console.log("not connect successfully");
        process.exit(1);
})
    
}