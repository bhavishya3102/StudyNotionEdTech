import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { fetchInstructorCourses } from '../../../services/operations/courseDetailsAPI';
import CourseTable from './InstructorCourses/CourseTable';

const MyCourses = () => {
    const {token}=useSelector((state)=>state.auth);
    const navigate=useNavigate();
    const [courses,setcourse]=useState([]);

    // get the instructor courses
    
 
    useEffect(() => {
        const fetchCourses=async ()=>{
            const result=await fetchInstructorCourses(token);
            console.log(result);
            if(result){
                setcourse(result);
            }
        }
        fetchCourses();

    }, [])
  return (
    <div className='text-white'>
      <div className='flex justify-between'>
      <h1 className='text-white'>My Courses</h1>
      <button onClick={()=> navigate("/dashboard/add-course")} className='bg-pure-greys-500 px-4 py-2'>Add Courses</button>
      </div>

      {
        courses && <CourseTable courses={courses} setcourse={setcourse}/>
      }
    </div>
  )
}

export default MyCourses
