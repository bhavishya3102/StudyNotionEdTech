const express=require("express");
const app=express();
require("dotenv").config();
 
const courseroute=require("./routes/Course");
const paymentroute=require("./routes/Payment");
const profileroute=require("./routes/Profile");
const userroute=require("./routes/User");

const {connectdb}=require("./config/connectdb");
const {cloudinaryconnect}=require("./config/cloudinaryconnect");

const cookieParser=require("cookie-parser");
const cors=require("cors");
const fileupload=require("express-fileupload");

// database connect
connectdb();
// cloudinary connect
cloudinaryconnect();


// middlewares
app.use(express.json());
app.use(cookieParser());
// cors middleware when we use backend with different port no and frontend with different port no
app.use(
    cors({
        origin:"*",
        credentials:true,
    })
)

// file upload middleware

/**   useTempFiles:true   ----This option indicates that the uploaded files should be stored as temporary files
 *  on the server before they are moved or processed further. When set to true, the 
 * uploaded files will be available on the req.files */

/** tempFileDir:"/tmp" ----This option specifies the directory where the temporary files should be stored. 
 * In this case, it is set to "/tmp", which is a commonly used directory path for storing 
 * temporary files  */

app.use(
    fileupload({
        useTempFiles:true,
        tempFileDir:"../public/temp"
    })
)

//mounting
app.use("/api/v1/course",courseroute);
app.use("/api/v1/payment",paymentroute);
app.use("/api/v1/profile",profileroute);
app.use("/api/v1/user",userroute);

// default route
app.get("/",(req,resp)=>{
    return resp.json({
        success:true,
        message:"your server is up"
    })
})

const port=process.env.PORT;

// start the server
app.listen(port,()=>{
    console.log(`server is running at ${port}`)
})

