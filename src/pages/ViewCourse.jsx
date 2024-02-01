import React, { useEffect, useState } from "react";
import VideoDetailsSidebar from "../Components/Core/ViewCourse/VideoDetailsSidebar";
import { Outlet, useParams } from "react-router-dom";
import CourseReviewModal from "../Components/Core/ViewCourse/CourseReviewModal";
import { useDispatch, useSelector } from "react-redux";
import { getFullDetailsOfCourse } from "../services/operations/courseDetailsAPI";
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from "../Slices/viewCourseSlice";

const ViewCourse = () => {
 
  // get the full course detail from the fullcoursedetail api and save the enrolled course
  // detail in view course slice so that we get the details from any components
  const [reviewModal, setReviewModal] = useState(false);
const {courseid}=useParams();
const {token}=useSelector((state)=> state.auth)
const dispatch=useDispatch();


useEffect(() => {
  console.log("start")
const setCourseSpecificDetails= async()=>{
    const coursedata=await getFullDetailsOfCourse(courseid,token);
console.log(coursedata)

dispatch(setCourseSectionData(coursedata?.coursedetail?.coursecontent))
dispatch(setEntireCourseData(coursedata.coursedetail))
dispatch(setCompletedLectures(coursedata?.completedVideos))

let lectures=0;
coursedata?.coursedetail.coursecontent.map((sec,i) => {
lectures+=sec.subsection.length 
})
dispatch(setTotalNoOfLectures(lectures))
console.log(lectures)
}

setCourseSpecificDetails();
}, [])
  return (
    <>
    <div className="relative flex min-h-[calc(100vh-3.5rem)]">
    <VideoDetailsSidebar setReviewModal={setReviewModal} />


      <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
        <div className="mx-6">

      {/**An <Outlet> should be used in parent route elements to
     render their child route elements. This allows nested UI to show up when child routes
     are rendered. If the parent route matched exactly, it will render a child index route or nothing 
    if there is no index route. */} 
          <Outlet />
        </div>
      </div>
    </div>
    {
      console.log(reviewModal)
    }
    {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
  </>
  );
};

export default ViewCourse;
