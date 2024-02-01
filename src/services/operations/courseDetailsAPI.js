import { apiconnector } from "../apioperator";
import { courses } from "../apis";
import {toast} from 'react-toastify';

const {GETALLCATEGORIES,CREATECOURSE,EDITCOURSE,CREATE_SECTION_API,UPDATE_SECTION_API,
DELETE_SECTION_API,DELETE_SUBSECTION_API,CREATE_SUBSECTION_API,UPDATE_SUBSECTION_API,GET_ALL_INSTRUCTOR_COURSES_API,
DELETE_COURSE_API,GET_FULL_COURSE_DETAILS_AUTHENTICATED
,CREATE_RATING_API,LECTURE_COMPLETION_API,GET_REVIEWS}=courses;
export const getallcategory=async()=>{
    let result=[];
    try{
        console.log("a");
        
                const response=await apiconnector("GET",GETALLCATEGORIES);
        if (!response?.data?.success) {
            throw new Error("Could Not Fetch Course Categories")
        }
        result = response?.data?.allcategories
        console.log(result);
        } catch (error) {
          console.log("COURSE_CATEGORY_API API ERROR............", error)
          toast.error(error.message)
        }
        return result;
    }


    export const editcourse=async (formdata,token)=>{
        let result=null;
        const toastId = toast.loading("Loading...");
            try{

              
        const response=await apiconnector("POST",EDITCOURSE,formdata,{
            Authorisation:`Bearer ${token}`
        })
        console.log("COURSE RESPONSE",response);
        if(!response.data.success){
            throw new Error(response.data.message);
        }
        
        toast.success("edit course details updated successfully");
    
        result=response?.data?.data;
            }catch(error){
                console.log(error);
                toast.error("failed to update profile ");
            }
            toast.dismiss(toastId)
            return result;
        } 

        export const addCourseDetails = async (formdata, token) => {
            let result = null
            const toastId = toast.loading("Loading...");
            try {
        console.log("a");

              const response = await apiconnector("POST", CREATECOURSE, formdata, {
                Authorisation: `Bearer ${token}`
              })
              console.log("CREATE COURSE API RESPONSE............", response)
              if (!response?.data?.success) {
                throw new Error("Could Not Add Course Details")
              }
              toast.success("Course Details Added Successfully")
              result = response?.data?.data
            } catch (error) {
              console.log("CREATE COURSE API ERROR............", error)
              toast.error(error.message)
            }
            toast.dismiss(toastId)
            return result
          }


          // create a section
export const createSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiconnector("POST", CREATE_SECTION_API, data, {
      Authorisation: `Bearer ${token}`,
    })
    console.log("CREATE SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Create Section")
    }
    toast.success("Course Section Created")
    result = response?.data?.updatecoursedetails
  } catch (error) {
    console.log("CREATE SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}


          // update a section
export const updateSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiconnector("POST", UPDATE_SECTION_API, data, {
      Authorisation: `Bearer ${token}`,
    })
    console.log("UPDATE SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Update Section")
    }
    toast.success("Course Section Updated")
    result = response?.data?.data
  } catch (error) {
    console.log("UPDATE SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

// delete a section
export const deleteSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiconnector("POST", DELETE_SECTION_API, data, {
      Authorisation: `Bearer ${token}`,
    })
    console.log("DELETE SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Section")
    }
    toast.success("Course Section Deleted")
    result = response?.data?.data
  } catch (error) {
    console.log("DELETE SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

// delete a subsection
export const deleteSubSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiconnector("POST", DELETE_SUBSECTION_API, data, {
      Authorisation: `Bearer ${token}`,
    })
    console.log("DELETE SUB-SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Lecture")
    }
    toast.success("Lecture Deleted")
    result = response?.data?.data
  } catch (error) {
    console.log("DELETE SUB-SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

// create a subsection
export const createSubSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiconnector("POST", CREATE_SUBSECTION_API, data, {
      Authorisation: `Bearer ${token}`,
    })
    console.log("CREATE SUB-SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Add Lecture")
    }
    toast.success("Lecture Added")
    result = response?.data?.data
  } catch (error) {
    console.log("CREATE SUB-SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

// update a subsection
export const updateSubSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiconnector("POST", UPDATE_SUBSECTION_API, data, {
      Authorisation: `Bearer ${token}`,
    })
    console.log("UPDATE SUB-SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Update Lecture")
    }
    toast.success("Lecture Updated")
    result = response?.data?.data
  } catch (error) {
    console.log("UPDATE SUB-SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

// fetching all courses under a specific instructor
export const fetchInstructorCourses = async (token) => {
  let result = []
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiconnector(
      "GET",
      GET_ALL_INSTRUCTOR_COURSES_API,
      null,
      {
        Authorisation: `Bearer ${token}`,
      }
    )
  
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Instructor Courses")
    }
    result = response?.data?.data

  } catch (error) {
    console.log("INSTRUCTOR COURSES API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

export const deleteCourse = async (data, token) => {
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiconnector("DELETE", DELETE_COURSE_API, data, {
      Authorisation: `Bearer ${token}`,
    })
    console.log("DELETE COURSE API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Course")
    }
    toast.success("Course Deleted")
  } catch (error) {
    console.log("DELETE COURSE API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
}

// get full details of a course
export const getFullDetailsOfCourse = async (courseid, token) => {
  const toastId = toast.loading("Loading...")
  //   dispatch(setLoading(true));
  let result = null
  try {
    const response = await apiconnector(
      "POST",
      GET_FULL_COURSE_DETAILS_AUTHENTICATED,
      {
        courseid,
      },
      {
        Authorisation: `Bearer ${token}`,
      }
    )
    console.log("COURSE_FULL_DETAILS_API API RESPONSE............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response?.data?.data
    console.log(result)
  } catch (error) {
    console.log("COURSE_FULL_DETAILS_API API ERROR............", error)
  
    // toast.error(error.response.data.message);
  }
  toast.dismiss(toastId)
  //   dispatch(setLoading(false));
  return result
}

// create a rating for course
export const createRating = async (data, token) => {
  const toastId = toast.loading("Loading...")
  let success = false
  try {
    const response = await apiconnector("POST", CREATE_RATING_API, data, {
      Authorisation: `Bearer ${token}`,
    })
    console.log("CREATE RATING API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Create Rating")
    }
    toast.success("Successfully review the course")
    success = true
  } catch (error) {
    success = false
    console.log("CREATE RATING API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return success
}


// lecutre completetion api
// mark a lecture as complete
export const markLectureAsComplete = async (data, token) => {
  let result = null
  console.log("mark complete data", data)
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiconnector("POST", LECTURE_COMPLETION_API, data, {
      Authorisation: `Bearer ${token}`,
    })
    console.log(
      "MARK_LECTURE_AS_COMPLETE_API API RESPONSE............",
      response
    )

    if (!response.data.message) {
      throw new Error(response.data.error)
    }
    toast.success("Lecture Completed")
    result = true
  } catch (error) {
    console.log("MARK_LECTURE_AS_COMPLETE_API API ERROR............", error)
    toast.error(error.message)
    result = false
  }
  toast.dismiss(toastId)
  return result
}

// get all reviews
export const getreviews = async () => {
  let result=[]
  try {
    const response = await apiconnector("GET", GET_REVIEWS);
    console.log(
      "GET ALL  RESPONSE............",
      response
    )

    if (!response.data.message) {
      throw new Error(response.data.error)
    }
  result=response?.data.allrating
  console.log(result)
  
  } catch (error) {
    console.log("MARK_LECTURE_AS_COMPLETE_API API ERROR............", error)
    toast.error(error.message)
   
  }
  return result;
}