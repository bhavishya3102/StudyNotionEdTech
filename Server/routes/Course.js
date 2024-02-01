const express=require("express");
const router=express.Router();

// course controller import
const {createCourse,deleteCourse,editCourse, showallcourses ,getcoursedetails,getInstructorCourses}=require("../controllers/Course");

//categories controller import
const {createCategory ,getallcategory ,categorypagedetails}=require("../controllers/Category");


// course progress import
const {updateCourseProgress}=require("../controllers/courseProgress")
//section controlller import
const {createsection, updatesection, deletesection}=require("../controllers/Section");

//subsection controlller import
const {createsubsection ,updatesubsection, deletesubsection}=require("../controllers/Subsection");

// rating and review controller import
const {createrating ,averagerating ,allratingreviews}=require("../controllers/Ratingandreview");

// importing middleware
const {auth,isStudent,isAdmin,isInstructor}=require("../middlewares/auth");


// creating routes created by instructor
router.post("/createCourse",auth,isInstructor,createCourse);
router.post("/editCourse",auth,isInstructor,editCourse);
router.delete("/deleteCourse",auth, deleteCourse);
router.get("/getInstructorCourses",auth,isInstructor,getInstructorCourses);
router.post("/addSection",auth,isInstructor,createsection);
router.post("/updateSection",auth,isInstructor,updatesection);
router.post("/deleteSection",auth,isInstructor,deletesection);
router.post("/createSubSection",auth,isInstructor,createsubsection);
router.post("/updateSubSection",auth,isInstructor,updatesubsection);
router.post("/deleteSubSection",auth,isInstructor,deletesubsection);
router.get("/getAllCourses",auth,showallcourses);
router.post("/getCourseDetails",auth,getcoursedetails);
router.post("/updatecourseprogress",auth,isStudent,updateCourseProgress);


// routes created by admin
router.post("/createCategory",auth,isAdmin,createCategory);
router.get("/showAllCategories",getallcategory);
router.post("/getCategoryPageDetails",categorypagedetails);

// rating and review created by student 

router.post("/createRating",auth,isStudent,createrating);
router.get("/getAverageRating",averagerating);
router.get("/getReviews",allratingreviews);

module.exports=router;