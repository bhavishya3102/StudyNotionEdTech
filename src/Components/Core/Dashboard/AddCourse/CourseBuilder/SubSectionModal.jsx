import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { createSubSection, updateSubSection } from '../../../../../services/operations/courseDetailsAPI';
import { setcourse } from '../../../../../Slices/Course';

import { RxCross2 } from "react-icons/rx";
import Upload from '../Upload';

const SubSectionModal = ({modaldata,setmodaldata,add=false,view=false,edit=false}) => {
const {register,setValue,getValues,handleSubmit,formState:{errors}}=useForm();
const dispatch=useDispatch();
const [loading, setloading] = useState(false);
const {course}=useSelector((state)=>state.course);
const {token}=useSelector((state)=>state.auth);

console.log(modaldata);

useEffect(() => {
if(view || edit){
    setValue("lectureTitle",modaldata.title);
    setValue("lectureDesc",modaldata.description);
    setValue("lectureVideo",modaldata.videourl);

}
}, [])

// check the form is updated or not 
const isFormUpdated=()=>{
    const currentValues=getValues();
    if(currentValues.lectureTitle!==modaldata.title  || 
        currentValues.lectureDesc!==modaldata.description  ||
         currentValues.lectureVideo!==modaldata.videourl  ){
            return true;
         }

         return false;

}


const handleEditSubSection=async ()=>{

    const currentValues=getValues();
    const formdata=new FormData();

    formdata.append("sectionid",modaldata.sectionid);
    formdata.append("subsectionid",modaldata._id);

    if(currentValues.lectureTitle!==modaldata.title){
        formdata.append("title",currentValues.lectureTitle);
    }

    if(currentValues.lectureDesc!==modaldata.description){
        formdata.append("description",currentValues.lectureDesc);
    }
    
    if(currentValues.lectureVideo!==modaldata.videourl){
        formdata.append("video",currentValues.lectureVideo);
    }
    
   
    setloading(true);
  console.log(currentValues.lectureTitle);
  console.log(currentValues.lectureDesc);
  console.log(modaldata._id);
  console.log(modaldata.sectionid);
    // API call

    const result = await updateSubSection(formdata,token);

    const updatedsection=course?.coursecontent.map((section)=> section._id===modaldata.sectionid?result:section);
    const updatedcourse={...course,coursecontent:updatedsection};

    if(result){
        dispatch(setcourse(updatedcourse));
    }
    setmodaldata(null);
    setloading(false);
}


const onSubmit=async (data)=>{
    // if we only view the subsection 
    if(view){
        return;
    }
// if we edit the subsection check form is updated or not 
    if(edit){
        if(!isFormUpdated()){
            toast.error("No changes made to the form");

        }
        else{
            // edit kardo and call the api to updata the subsection
            handleEditSubSection();
        }
        return ;
    }

    // now if we add the subsection then first we make a formdata and call the api to create the subsection

    const formdata=new FormData();
    formdata.append("sectionid",modaldata);
    formdata.append("title",data.lectureTitle);
    formdata.append("description",data.lectureDesc);
    formdata.append("video",data.lectureVideo);

    setloading(true);
    // API call
    // create subsection karna ha to hame section id chaiye kisme subsection create karna h kya content dalna vo bhii
    // pass karna padega -

    console.log(modaldata);
    const result=await createSubSection(formdata,token);

    const updatedsection=course?.coursecontent.map((section)=> section._id===modaldata?result:section);
    const updatedcourse={...course,coursecontent:updatedsection};
    if(result){
        dispatch(setcourse(updatedcourse));
    }
    setmodaldata(null);
    setloading(false);
}

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
    <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">

         <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">

    <p className="text-xl font-semibold text-richblack-5">{ view && "Viewing"} { add && "Adding"} {edit && "Editing" } Lecture</p>
    <button onClick={()=> (!loading? setmodaldata(null): {})}>
    <RxCross2 className="text-2xl text-richblack-5"/>
    </button>

    
    
    </div>

    <form onSubmit={handleSubmit(onSubmit)}  className="space-y-8 px-8 py-10">
    <Upload  
    name="lectureVideo"
    label="Lecture Video"
    register={register}
    errors={errors}
    setValue={setValue}
    video = {true}
    viewData = {view? modaldata.videourl :null}
    editData = {edit? modaldata.videourl :null}
    ></Upload>

    <div className="flex flex-col space-y-2">

<label className='text-[1.2rem] text-richblack-25 font-bold'>Lecture Title</label>
<input id="lectureTitle" className="w-full form-style" placeholder='Enter Lecture Title' {...register("lectureTitle",{required:true})} ></input>
{
    errors.lectureTitle && (
        <span>Lecture title is required</span>
    )
}
</div>

<div>
<label className='text-[1.2rem] text-richblack-25 font-bold'>Lecture Description</label>
<input id="lectureDesc" className="w-full form-style" placeholder='Enter Lecture Description' {...register("lectureDesc",{required:true})} ></input>
{
    errors.lectureDesc && (
        <span>Lecture Description is required</span>
    )
}
</div>

{
    !view && (
        
        <button type="submit" className='bg-yellow-100 px-8 rounded-md py-2'>{edit?"Save Changes":"Save"}</button>
        
    )
}

    </form>
    </div>


    </div>
  )
}

export default SubSectionModal
