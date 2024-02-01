import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { COURSE_STATUS } from "../../../../utils/constants";
import { deleteCourse, fetchInstructorCourses } from "../../../../services/operations/courseDetailsAPI";
import Confirmation from "../../../Common/Confirmation";
import { useNavigate } from "react-router-dom";
import { MdModeEdit } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";
const CourseTable = ({courses,setcourse}) => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [loading, setloading] = useState(false);
  const [confirmation, setconfirmation] = useState(null);
  const navigate=useNavigate();


async function handleDeleteCourse(courseid){
    setloading(true);
    await deleteCourse({courseid},token);
    const result=await fetchInstructorCourses(token);
    if(result){
        setcourse(result)
    }
    setconfirmation(null);
    setloading(false);

}
console.log(courses);
  return (
    <div className="mt-[5vh]">
      <Table>
        <thead className="">
          <Tr className="flex flex-row justify-between mb-[20px] text-[1.2rem]">
            <th>Courses</th>
            <th className="flex ">Description</th>
            <th>Status</th>
            <th>Price</th>
            <th className="-translate-x-[2vw]">Actions</th>
          </Tr>
        </thead>

        <Tbody>
        
        {
            courses.length==0?(
                <Tr>
                <td>
                No Courses Found
                </td>
                </Tr>
            ):(
        <div className="flex flex-col gap-3">
        {
          courses?.map((course) => (
            <Tr key={course._id} className="bg-richblack-800 px-6 py-3 rounded-md flex flex-row justify-between">
            <Td className="flex ">
            <img src={course?.thumbnail} className="h-[150px] w-[220px] rounded-lg"></img>

            <div className="flex flex-col gap-2">
            <p className="text-[1.2rem] font-bold">{course.coursename}</p>
            <p>{course?.coursedescription}</p>
           <div className="flex flex-row gap-2">
        
           </div>
           
            </div>
            
          
            </Td>
         
            <Td className="flex gap-2">
            <p>Created:</p>
            {
                course.status===COURSE_STATUS.DRAFT?
                (<p>Draft</p>):(
                    <p>Published</p>
                )
            }
            </Td>
            <Td>
            {course?.price}
            </Td>
            <Td>
            <button onClick={()=> navigate(`/dashboard/edit-course/${course?._id}`)} className=" translate-x-[3vw]">
            <MdModeEdit />
            </button>
            
            </Td>
            <Td>
            <button onClick={()=>{
                setconfirmation({
                    text1: "Do you want to Delete this course",
                    text2: "All the data related to this course is deleted",
                    btntext1: "delete",
                    btntext2: "Cancel",
                    btnhandler1: () =>
                      handleDeleteCourse(course._id),
                    btnhandler2: () => setconfirmation(null),
                })
            }}>
            <MdOutlineDelete/>
            </button>
            </Td>
        

            </Tr>
        ))
        }
        </div>
            )
        }
        </Tbody>
      </Table>

      {
        confirmation && <Confirmation modaldata={confirmation}></Confirmation>
      }
    </div>
  );
};

export default CourseTable;
