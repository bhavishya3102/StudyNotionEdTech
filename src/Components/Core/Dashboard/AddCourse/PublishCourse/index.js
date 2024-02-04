import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { resetcourse, setstep } from '../../../../../Slices/Course';
import { COURSE_STATUS } from '../../../../../utils/constants';
import { editcourse } from '../../../../../services/operations/courseDetailsAPI';
import { useNavigate } from 'react-router-dom';
const PublishCourse = () => {
    const {register,getValues,setValue,handleSubmit}=useForm();
    const {course}=useSelector((state)=> state.course);
    const {token}=useSelector((state)=> state.auth);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [loading ,setloading]=useState(false);

useEffect(() => {
if(course?.status===COURSE_STATUS.PUBLISHED){
    setValue("public",true);
}
}, [])

    const goback=()=>{
        dispatch(setstep(2));
    }

function goToCourses(){

dispatch(resetcourse())
navigate("/dashboard/my-courses");

}


async function handlepublish(){
    if(course?.status===COURSE_STATUS.PUBLISHED && getValues("public")===true || 
    (course?.status=== COURSE_STATUS.DRAFT && getValues("public")===false)){
    // no updation in the form 
    // no need to call Api


        goToCourses();
        return;
    }
// if Form is updated
const formdata=new FormData();
formdata.append("courseid",course?._id);
const coursestatus=getValues("public")?COURSE_STATUS.PUBLISHED:COURSE_STATUS.DRAFT;
formdata.append("status",coursestatus);
setloading(true);
console.log(course?._id);
console.log(coursestatus);
const result=await editcourse(formdata,token);
console.log(result);
if(result){
    goToCourses();
}
setloading(false);

}

    const onSubmit=()=>{
handlepublish();
    }
  return (
    <div className='text-white flex flex-col gap-4 bg-richblack-800 px-6 py-4'>
    <p className='text-[1.2rem] text-richblack-25 font-bold'>Publish Course</p>
    <form onSubmit={handleSubmit(onSubmit)}>
    <div className='my-6 flex '>
    <label htmlFor='public'>
    <input type='checkbox' id='public' {...register("public")}               className="border-gray-300 h-4 w-4 rounded bg-richblack-500 text-richblack-400 focus:ring-2 focus:ring-richblack-5"></input>

<span className='ml-2 text-richblack-300 font-bold '> Make this Course As Public</span>
    </label>
    </div>

    <div className='flex gap-4'>
    <button type='button' onClick={goback} className='rounded-md py-2 bg-pure-greys-400 px-4'> Back</button>
    <button  type='submit' className='rounded-md bg-pure-greys-400 px-4 py-2'>Save Changes</button>
    </div>


    
    </form>
      
    </div>
  )
}

export default PublishCourse
