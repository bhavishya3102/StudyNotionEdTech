import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserEnrolledCourses } from "../../../services/operations/profileapi";
import ProgressBar from "@ramonak/react-progress-bar";
import { useNavigate } from "react-router-dom";

const EnrolledCourses = () => {
  const [enrollcourse, setenrollcourse] = useState(null);
  const { token } = useSelector((state) => state.auth);
  const navigate=useNavigate();

  async function getenrolledcourses() {
    try {
      const response = await getUserEnrolledCourses(token);
     const filterresp=response.filter((ele)=>ele.status!=="Draft")
console.log(filterresp)
      setenrollcourse(filterresp);
      console.log("bhavi")
    } catch (error) {
      throw new Error("error");
    }
  }
  useEffect(() => {

  getenrolledcourses();
  }, [])


  return (
    <div className="text-white">
      {!enrollcourse ? (
        <div></div>
      ) : enrollcourse.length > 0 ? (
        <div>
        <h1 className="text-lg font-bold">Enrolled Courses</h1>

          <div className="flex flex-row rounded-t-lg bg-richblack-500 justify-between">
          <p className="w-[45%] px-5 py-3">Course Name</p>
          <p className="w-1/4 px-2 py-3">Duration</p>
          <p className="flex-1 px-2 py-3">Progress</p>
          </div>

          <div className="flex flex-col gap-3 mt-2">
            {enrollcourse.map((elem, ind) => {
              return (

                
                <div key={ind} onClick={()=>
                navigate(`/view-course/${elem._id}/section/${elem.coursecontent?.[0]?._id}/subsection/${elem.coursecontent?.[0]?.subsection?.[0]?._id}`)
                } className="flex flex-row items-center border px-5 py-3  border-richblack-700 justify-between">
                  <img src={elem.thumbnail} className="h-[100px] w-[120px] rounded-lg object-cover"></img>
                  <div className="flex   flex-col gap-2 ">
                    <h2 className="font-semibold">{elem.coursename}</h2>
                    <p className="text-xs text-richblack-300 ">{elem.coursedescription}</p>
                  </div> 

                  <div>
                    <p>{elem.duration}</p>
                 
                  </div>

                  <div className="flex w-1/5 flex-col gap-2 px-2 py-3">
                    <div>Progress: {elem.progressPercentage} %</div>
                    <ProgressBar
                      completed={elem.progressPercentage || 0}
                     
                      height="8px"
                      isLabelVisible={false} 
               
  
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
       <div>
       <h1>Enrolled Courses</h1>
       <div>You have not Enrolled in any Course </div>
       </div>
      )}
    </div>
  );
};

export default EnrolledCourses;
