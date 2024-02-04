import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { BuyCourse } from "../services/operations/studentFeaturesApi";
import { getFullCourseInformation } from "../services/operations/courseDetailsAPI";
import GetAvgRating from "../utils/avgRating";
import Confirmation from "../Components/Common/Confirmation";
import RatingStars from "../Components/Common/RatingStars";
import { BiInfoCircle } from "react-icons/bi";
import { formattedDate } from "../utils/dataFormatter";
import { HiOutlineGlobeAlt } from "react-icons/hi2";
import Footer from "../Components/Common/Footer";
import { toast } from "react-toastify";
import { addtocart } from "../Slices/Cartslice";
import CourseAccordian from "../Components/Core/Course/CourseAccordian";

const CourseDetails = () => {

  // hooks we use it is the in the top level of the component and not use inside the conditions
  // or not use inside the functions . the position is in the top level of component 


  /***function MyComponent() {
  // Priority: Declare state with useState-top level
  const [count, setCount] = useState(0);
  const [data, setData] = useState(null);

  // Priority: Use useEffect for side effects
  useEffect(() => {
    // Side effect logic (e.g., data fetching)
    fetchData().then((result) => setData(result));
  }, [ dependencies ]*/


  const { user } = useSelector((state) => state.profile);
  
  const { token } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.profile);
  const { paymentLoading } = useSelector((state) => state.course);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { courseid } = useParams();
  const [coursedata, setcoursedata] = useState(null);
  const [avgReviewCount, setavgReviewCount] = useState(0);
  const [confirmationModal, setconfirmationModal] = useState(null);
  const [isActive ,setisActive]=useState(Array(0))
   // Total no of lectures
 const [totalNoOfLecture, settotalNoOfLecture] = useState(0);
  console.log(user);

// to handle the toggle case in accordian if id is not present then concat it otherwise 
// remove from it
const handleActive=(id)=>{

setisActive(!isActive.includes(id)
?isActive.concat(id)
:isActive.filter((e)=> e!==id))

}

  useEffect(() => {
    async function fetchdata() {
      try {
        const resp = await getFullCourseInformation(courseid);
        console.log(resp);
        setcoursedata(resp);
      } catch (error) {
        console.log("could not fetch course data");
      }
    }
    fetchdata();
  }, [courseid]);

  console.log(coursedata);
  useEffect(() => {
    const count = GetAvgRating(coursedata?.ratingandreviews);
    setavgReviewCount(count);
  }, []);

  if (!coursedata) {
    return (
      <div>
  {
    console.log(coursedata)
  }
      </div>
    );
  }


    const {
      _id,
      coursename,
      coursedescription,
      thumbnail,
      price,
      whatyouwillLearn,
      coursecontent,
      ratingandreviews,
      instructor,
      studentEnrolled,
      createdAt,
      instructions,
    } =coursedata?.coursedetail;



  const handleBuyCourse = () => {
   
    if (token) {
      BuyCourse(token, [courseid], user, navigate, dispatch);
    return ;
    }
    setconfirmationModal({
      text1: "you are not logged in",
      text2: "Please login to purchase course",
      btntext1: "Login",
      btntext2: "Cancel",
      btnhandler1: () => navigate("/login"),
      btnhandler2: () => setconfirmationModal(null),
    });
  };

  
  const handlecart=()=>{
    // if the user is instructor can't add to cart
    if(user && user?.accounttype==="Instructor"){
      toast.error("you are an instructor . you can not add to cart")
      return ;
    }
    // if the user login and student then add to cart
    if(token){
      dispatch(addtocart(coursedata));
      return ;
    }

    // if the user not logged in then show confirmation model
    setconfirmationModal({
      text1: "you are not logged in",
      text2: "Please login to purchase course",
      btntext1: "Login",
      btntext2: "Cancel",
      btnhandler1: () => navigate("/login"),
      btnhandler2: () => setconfirmationModal(null),
    })

  }

  // console.log(studentsEnroled.includes(user._id));
  return (
    <div className="flex text-white flex-col  bg-richblack-900">
      <div className="bg-richblack-800  h-full px-4 py-5 relative ">
        <div className="text-white w-4/12 flex flex-col items-baseline  ">
          <div className="text-white font-bold">
            Home/Catalog/
            <span className="text-yellow-25">{`${coursename}`}</span>
          </div>
          <div>{coursename}</div>
          <div>{coursedescription}</div>

          <div className="flex flex-row gap-2">
            <span className="text-yellow-5">{avgReviewCount || 0}</span>
            <RatingStars Review_Count={avgReviewCount} />
            <span className="text-richblack-400">
              {coursedata.coursedetail.ratingandreviews.length} Ratings
            </span>
          </div>

          <div>
            <span>
              created by: {`${instructor.firstname} ${instructor.lastname}`}
            </span>
          </div>

          <div className="flex flex-row gap-2 items-center">
            <BiInfoCircle />
            <span>Created at {formattedDate(createdAt)}</span>
          </div>
          <p className="flex items-center gap-2">
            {" "}
            <HiOutlineGlobeAlt /> English
          </p>
        </div>

        <div className="text-white ">
          <div className="absolute right-9 top-6 bg-richblack-700 p-4">
            <img src={`${thumbnail}`} className="h-[35vh] w-[20vw]"></img>
            <div>Rs {price}</div>
            <div className="flex flex-col gap-2">
            {/**add to cart only shown when the user is logged in and
          amd user is not a instructor
          */}
         

          {
          
            (!user || studentEnrolled && !studentEnrolled.includes(user?._id)) && 
            <button onClick={handlecart} className="bg-yellow-200 px-4 py-3 rounded-md text-black font-bold">
            Add to Cart
          </button> 
          }


{/** if student is logged in and buy the course then show go to course and not show add to cart button and if 
the user is not purchase the course then show buy course option
*/}
<button onClick={user && studentEnrolled && studentEnrolled.includes(user?._id)
  ?()=> navigate("/dashboard/enrolled-courses")
  : handleBuyCourse} className="bg-richblack-500 px-4 py-3 rounded-md text-black font-bold">
  {
    user && studentEnrolled && studentEnrolled.includes(user?._id)?"Go to Course":"Buy Course"

  }
</button>
         
              <p className=" text-center"> 30 Days Money-Back Gurantee</p>
            </div>
            <div className="pt-2">
              This Course includes-
              {instructions.map((elem, i) => {
                return (
                  <div key={i} className="flex flex-row gap-2 items-center ">
                    <div className="font-bold ">.</div>
                    <div className="text-caribbeangreen-400">{elem}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="pt-4 flex flex-col ">
        <div className="border pt-2 min-h-[20vh]  relative left-0 w-[75vw] border-richblack-500 p-5 gap-4">
          <div className="text-[1.8rem] font-bold">What you Will Learn</div>
          <div>{whatyouwillLearn}</div>
        </div>
      </div>

      <div className="pb-8 pt-24">
        <div> Course Content</div>
        <div>
          <span>{`${coursecontent.length} sections`}</span>{" "}
          <span>{`${totalNoOfLecture} lectures`}</span>{" "}
          <span>{coursedata?.totalDuration} Total Duration</span>
        
        </div>
      </div>

      {/** to handle the collapse section we add the id in the array of the section that is open 
    if the array is empty then all are collapsed no one section is open , we make the array to 
    handle this collapse section
    
    */}
<div className="">
<div>
<button onClick={()=>setisActive([])}>
Collapse All section
</button>
</div>

{
  coursecontent.map((coursesec,i)=>(
    <CourseAccordian key={i} course={coursesec} isActive={isActive} handleActive={handleActive}/>
  ))
}


</div>


      {confirmationModal && <Confirmation modaldata={confirmationModal} />}
      <Footer/>
    </div>
  );
};

export default CourseDetails;
