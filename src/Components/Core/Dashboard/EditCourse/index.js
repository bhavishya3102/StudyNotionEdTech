import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import RenderSteps from '../AddCourse/RenderSteps';
import { setcourse, seteditCourse } from '../../../../Slices/Course';
import { getFullDetailsOfCourse } from '../../../../services/operations/courseDetailsAPI';

const EditCourse = () => {
const dispatch=useDispatch();
const {courseid}=useParams();
const {course}=useSelector((state)=>state.course);
const [loading,setloading]=useState(false);
const {token}=useSelector((state)=> state.auth);

useEffect(() => {
    const populateCoursedetails=async ()=>{
        setloading(true);
        const result=await getFullDetailsOfCourse(courseid,token);
        console.log("bhavna"+result?.coursedetail);
        if(result){
            dispatch(setcourse(result.coursedetail));
            dispatch(seteditCourse(true));
        }
        setloading(false);
    }

    populateCoursedetails();

}, [])

{/**this is important without this we can get the 
previous data in the output and not get updated data 
we get but after loading then we get the updated data
because setstate is the asynchronous code and fetch the data is 
also asynchronous code this is run backend parallely
so that we use loading ....
*/}
if (loading) {
  return (
    <div className="grid flex-1 place-items-center">
      <div className="spinner">Loading...</div>
    </div>
  )
} 

console.log(course)
  return (
    <div>
    <h1>Edit Course</h1>
    <div>
    {
        course?(<RenderSteps></RenderSteps>):(<p>Course Not Found</p>)
    }
    </div>
      
    </div>
  )
}

export default EditCourse

