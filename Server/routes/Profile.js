const express = require("express")
const router = express.Router();

const {updateprofile, deleteaccount, getalluserdetails, updatedisplaypicture ,getenrolledcourses,instructorDashboard}=require("../controllers/Profile");
const {auth,isInstructor}=require("../middlewares/auth");
// create routes

router.delete("/deleteProfile",auth,deleteaccount);
router.put("/updateProfile",auth,updateprofile);
router.get("/getUserDetails",auth,getalluserdetails);
router.get("/getEnrolledCourses",auth,getenrolledcourses);
router.put("/updateDisplayPicture",auth,updatedisplaypicture);
router.get("/instructordashboard",auth,isInstructor,instructorDashboard);

module.exports=router;
