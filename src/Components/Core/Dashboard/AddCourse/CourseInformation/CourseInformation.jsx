import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addCourseDetails, editcourse, getallcategory } from "../../../../../services/operations/courseDetailsAPI";
import Requirementsfields from "../CourseInformation/Requirementsfields";
import Chipinput from "./Chipinput";
import Upload from "../Upload";
import { setcourse, setstep } from "../../../../../Slices/Course";
import {COURSE_STATUS} from "../../../../../utils/constants"
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

const CourseInformation = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false)
  const { token } = useSelector((state) => state.auth);
  const [courseCategories, setcourseCategories] = useState([]);
  const { course, editCourse } = useSelector((state) => state.course);
  const location=useLocation();

  
{/***
useEffect(() => {
  // This runs after every render when the dependencies change
  console.log(value); // Updated value during subsequent renders
}, [value]); // Dependency array includes the value 

*/}


useEffect(() => {
  const fetchcoursecategories = async () => {
    setLoading(true)
   
    const categories = await getallcategory();
  
    if(categories.length>0){
      
      setcourseCategories(categories);
    }
    setLoading(false)
  }
  
  /**if edit in the course is true then set the values- */

  if (editCourse) {
    console.log(course.coursename)
    setValue("courseTitle", course.coursename);
  
    setValue("courseShortDesc", course.coursedescription);
    setValue("coursePrice", course.price);
    setValue("courseTags", course.tag);
    setValue("courseBenefits", course.whatyouwillLearn);
    setValue("courseCategory", course.Category);
    
    setValue("courseRequirements", course.instructions);
    setValue("courseImage", course.thumbnail);
  }
  
  fetchcoursecategories()
  
}, [])
  
const isFormUpdated = () => {
    const currentValues = getValues();
    // console.log("changes after editing form values:", currentValues)
    if (
      currentValues.courseTitle !== course.coursename ||
      currentValues.courseShortDesc !== course.coursedescription ||
      currentValues.coursePrice !== course.price ||
      currentValues.courseTags.toString() !== course.tag.toString() ||
      currentValues.courseBenefits !== course.whatyouwillLearn ||
      currentValues.courseCategory._id !== course.Category._id ||
      currentValues.courseRequirements.toString() !==
        course.instructions.toString() ||
      currentValues.courseImage !== course.thumbnail
    ) {
      return true;
    }
    return false;
  };
  async function submithandler(data) {
    // console.log(data);

    // if we edit in the create course section
    if (editCourse) {
      if (isFormUpdated()) {
        const currentValues = getValues();
        const formdata = new FormData();
        formdata.append("courseid", course._id);

        if (currentValues.courseTitle !== course.coursename)
          formdata.append("coursename", data.courseTitle);

        if (currentValues.courseShortDesc !== course.coursedescription)
          formdata.append("coursedescription", data.courseShortDesc);

        if (currentValues.coursePrice !== course.price)
          formdata.append("price", data.coursePrice);

        if (currentValues.courseTags.toString() !== course.tag.toString())
          formdata.append("tag", JSON.stringify(data.courseTags));

        if (currentValues.courseBenefits !== course.whatyouwillLearn)
          formdata.append("whatyouwillLearn", data.courseBenefits);

          if ( currentValues.courseCategory._id !== course.Category._id )
          formdata.append("Category", data.courseCategory);

        if (
          currentValues.courseRequirements.toString() !==
          course.instructions.toString()
        )
          formdata.append(
            "instructions",
            JSON.stringify(data.courseRequirements)
          );

        if (currentValues.courseImage !== course.thumbnail)
          formdata.append("thumbnail", data.courseImage);

          console.log(data);
        setLoading(true);
        const result = await editcourse(formdata,token);
        console.log(result);
        setLoading(false);
        if (result) {
          dispatch(setstep(2));
          dispatch(setcourse(result));
        }
      } else {
        toast.error("no changes made to the form ");
      }
      return;
    }

    // when we create the course then this runs--
    const formdata = new FormData();
    formdata.append("coursename", data.courseTitle);
    formdata.append("coursedescription", data.courseShortDesc);
    formdata.append("price", data.coursePrice);
    formdata.append("tag", JSON.stringify(data.courseTags));
    formdata.append("whatyouwillLearn", data.courseBenefits);
    formdata.append("Category", data.courseCategory);
    formdata.append("status", COURSE_STATUS.DRAFT);
    console.log(data);
    formdata.append("instructions", JSON.stringify(data.courseRequirements));
    formdata.append("thumbnail", data.courseImage);
setLoading(true)
console.log(formdata);
const result = await addCourseDetails(formdata, token);
console.log(result);
if (result) {
  dispatch(setstep(2));
  dispatch(setcourse(result));
}
setLoading(false)
  }

  return (
    <div className="bg-richblack-800 px-8 py-4">
      <form onSubmit={handleSubmit(submithandler)}>
        <div>
          <label htmlFor="coursetitle" className="text-white  font-bold text-[1.2rem]">Course TItle</label>
          <input
            type="text"
            
            id="coursetitle"
            placeholder="Enter Course Title"
            className="h-[40px] w-full form-style"
            {...register("courseTitle", { required: true })}
          ></input>
          {errors.courseTitle && <span>Course Title is required</span>}
        </div>

        <div>
          <label htmlFor="coursedesc" className="text-white  font-bold text-[1.2rem]">Course Description</label>
          <textarea
            id="coursedesc"
            placeholder="Enter Course Description"
            className="min-h-[130px] w-full form-style"
            {...register("courseShortDesc", { required: true })}
          ></textarea>
          {errors.courseShortDesc && (
            <span>Course Description is required</span>
          )}
        </div>

        <div>
          <label htmlFor="courseprice"  className="text-white  font-bold text-[1.2rem]">Course Price</label>
          <input
            id="courseprice"
            placeholder="Enter Course Price"
            className="h-[40px] w-full form-style"
            {...register("coursePrice", { required: true })}
          ></input>
          {errors.courseprice && <span>Course Price is required</span>}
        </div>

        <div>
          <label htmlFor="courseCategory"  className="text-white  font-bold text-[1.2rem]">Course Category</label>
<br></br>
          <select
            {...register("courseCategory", { required: true })}
            className=" form-style w-full"
            id="courseCategory"
            
          >
        
          
      <option>Choose a Category</option>
            {!loading &&courseCategories.map((item, index) => (
           <option key={index}  value={item?._id} selected={item._id===getValues().courseCategory._id}>{item?.name}
              
              </option>
   ) )}
          </select>
        </div>

        

        <div>
          <label htmlFor="coursebenifit"  className="text-white  font-bold text-[1.2rem]">Course Benifits</label>
          <textarea
            id="coursebenifit"
            placeholder="Enter Course Benifits"
            className="min-h-[130px] form-style w-full"
            {...register("courseBenefits", { required: true })}
          ></textarea>
          {errors.courseBenifits && <span>Course Description is required</span>}
        </div>

        <Upload
          name="courseImage"
          label="Course Thumbnail"
          register={register}
          errors={errors}
          setValue={setValue}
          getValues={getValues}
          editData={editCourse ? course.thumbnail : null}
        />

        <Chipinput
          name="courseTags"
          label="Tags"
          register={register}
          errors={errors}
          setValue={setValue}
          getValues={getValues}
        />

        <Requirementsfields
          name="courseRequirements"
          label="Requirements/Instructions"
          register={register}
          errors={errors}
          setValue={setValue}
          getValues={getValues}
        />

        <div className="flex flex-row gap-3 mt-16">
          {editCourse && (
            <button
              onClick={() => dispatch(setstep(2))}
              className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
            >
              {" "}
              Continue Without Saving
            </button>
          )}

          <button
           
            className={`rounded-md bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
 disabled:bg-richblack-500 sm:text-[16px] `}
          >
            {!editCourse ? "Next" : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CourseInformation;
