import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { setcourse, seteditCourse, setstep } from '../../../../../Slices/Course';
import { toast } from 'react-toastify';
import NestedView from './NestedView';
import { createSection, updateSection } from '../../../../../services/operations/courseDetailsAPI';
import { IoAddCircleOutline } from 'react-icons/io5';

const CourseBuilderform = () => {

    const {register,handleSubmit,setValue,formState:{errors} }=useForm();
    const {course}=useSelector((state)=>state.course);
    const {token}=useSelector((state)=>state.auth);
    const [editsectionname,seteditsectionname]=useState(null);
    const dispatch=useDispatch();
    const [loading, setloading] = useState(false);

    console.log("course1",course);


// logic when we click the edit section button or create section button
    const submithandler=async (data)=>{
      console.log(data);
setloading(true);
let result;
// we can edit in the section if editsectionname is true
if(editsectionname){
   result=await updateSection({
    sectionname:data.sectionName,
    sectionid:editsectionname,
    courseid:course._id
   },token)
}
// if we create a new section if editsectionname  is false
else{
  result =await createSection({
    sectionname:data.sectionName,
    courseid:course._id
  },token)

}
// updatae the values
if(result){
  dispatch(setcourse(result));
  seteditsectionname(null);
  setValue("sectionName","");


}

// loading value
setloading(false);
    }


    const handleChangeEditSectionName=(sectionname,sectionid)=>{
      if(editsectionname==sectionid){
        cancelEdit();
        return;
      }
  
      seteditsectionname(sectionid);
      setValue("sectionName",sectionname);
    }


    const goBack=()=>{
      dispatch(setstep(1));
      dispatch(seteditCourse(true));  // now we edit the step 1 
    }

    const goToNext=()=>{
      if(course.coursecontent.length==0){
        toast.error("Please add atleast one section");
        return ;
      }
      // check in each section that add atleast one lecture
      if(course.coursecontent.some((section)=> section.subsection.length==0)){
        toast.error("please add atleast on lecture in each section");
        return ;
      }
      dispatch(setstep(3));
    }



    const cancelEdit=()=>{
      seteditsectionname(null);
      setValue("sectionName","");
    }

  return (
    <div className='bg-richblack-800 px-6 py-3 rounded-md flex flex-col gap-3' >
      <p  className="text-white  font-bold text-[1.3rem]">Course Builder</p>
      <form onSubmit={handleSubmit(submithandler)}>
      <div>
      <label  className="text-white  font-semibold text-[1rem]">
      Section Name <sup className='text-red text-[15px] '>*</sup>
      </label>
      <br></br>
      <input className='form-style w-full' id='sectionname' placeholder='Add a Section to build your course' {...register("sectionName",{required:true})}></input>
     {
        errors.sectionName && (
            <span>
            Section name is required
            </span>
        )
     }
      </div>

      <div className='flex '>
      <button type="submit"  outline={true} className='px-6 py-2 bg-richblack-800 border-yellow-200 border-2 text-yellow-200 rounded-lg mt-3 flex gap-2 items-center'>
      {editsectionname?"Edit section Name":" Create Section"}
      <IoAddCircleOutline size={20} className="text-yellow-50" />
      </button>
      {
        editsectionname && (
<button type="submit"  onClick={cancelEdit} className='text-sm text-richblack-300 underline'>Cancel Edit</button>
        )
      }
      

      </div> 

      </form>
      {
        course?.coursecontent.length>0 &&(
          <NestedView handleChangeEditSectionName={handleChangeEditSectionName}/>
        )
      }

      <div className='flex justify-end gap-x-3'>
      <button onClick={goBack} className='rounded-md cursor-pointer flex items-center px-6 py-2 bg-yellow-200  text-black mt-3'>Back</button>
      <button onClick={goToNext}  className='rounded-md cursor-pointer px-6 py-2 bg-yellow-200  text-black mt-3 flex items-center'>Go to Next</button>
      
      </div>
    </div>
  )
}

export default CourseBuilderform
