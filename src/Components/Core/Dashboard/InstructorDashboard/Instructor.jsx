import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchInstructorCourses } from "../../../../services/operations/courseDetailsAPI";
import { getInstructorData } from "../../../../services/operations/profileapi";
import InstructorChart from "./InstructorChart";
import { Link } from "react-router-dom";

const Instructor = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const [loading, setloading] = useState(false);
  const [instructorData, setInstructorData] = useState(null);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      setloading(true);
      const instructorApiData = await getInstructorData(token);
      const result = await fetchInstructorCourses(token);
      if (instructorApiData.length) {
        setInstructorData(instructorApiData);
      }

      console.log(instructorData); // null
      if (result) {
        setCourses(result);
      }

      setloading(false);
    };
    fetchdata();
  }, []);

  console.log(instructorData); // Array(13)
  console.log(courses);
  // calcultate the total amount of all courses

  const totalAmount = instructorData?.reduce((acc, curr) => {
    return acc + curr.totalAmountGenerate;
  }, 0);

  const totalStudents = instructorData?.reduce((acc, curr) => {
    return acc + curr.totalStudentsEnroll;
  }, 0);
  //   console.log(totalStudents)
  return (
    <div className="text-white">
      <div className="flex flex-col gap-2">
        <h1>Hi {user?.firstname}</h1>
        <p>Lets start something new</p>
      </div>

      {loading ? (
        <div className="spinner">Loading....</div>
      ) : courses.length > 0 ? (
        <div className="flex flex-col gap-3">
          <div className="flex flex-row gap-2 j w-[55vw] justify-between">
            <div className="bg-richblack-800 px-6 py-3 w-[35vw] pr-[5vw]">
              <InstructorChart courses={instructorData}></InstructorChart>
            </div>
            {/** stats */}
            <div className="flex flex-col gap-2 bg-richblack-800 px-6 w-[20vw] py-4 h-[35vh] items-start">
              <p className="font-bold text-[1.2rem] text-center ml-20">Statistics</p>

              <div>
                <p>Total Courses</p>
                <p>{courses.length}</p>
              </div>

              <div>
                <p>Total Students</p>
                <p>{totalStudents}</p>
              </div>
              <div>
                <p>Total Income</p>
                <p>{totalAmount}</p>
              </div>
            </div>
          </div>

          {/** courses */}
          <div className="flex flex-col  bg-richblack-800 px-6 py-3">
<div className="flex flex-row justify-between mb-4">
<p className="font-bold"> Your Courses</p>
<Link to="/dashboard/my-courses " className="text-yellow-200 font-bold">View All</Link>
</div>

            <div className="flex flex-row justify-between">
            {courses.slice(0, 3).map((course, i) => (
                <div>
                  <img src={course.thumbnail} className="h-[210px] w-[240px]"></img>
                  <div>
                    <p className="font-bold text-[1.2rem]"> {course.coursename}</p>
                    <div>
                      <p  className="font-semibold text-[1.1rem]">{course.studentEnrolled.length} students</p>
                      <p className="font-bold">Rs. {course.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Instructor;
