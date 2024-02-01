import { setloading } from "../../Slices/Profile";
import { apiconnector } from "../apioperator";
import { courses } from "../apis";
import {toast} from 'react-toastify';

const {GETENROLLEDCOURSES, GET_USER_ENROLLED_COURSES_API,GET_INSTRUCTOR_DASHBOARD}=courses;

export const showallcourses=async (token)=>
{
    const toastId = toast.loading("Loading...")
    let result=[];
   
   try{
    
    const response=await apiconnector("GET",GETENROLLEDCOURSES,null,{
        Authorisation:`Bearer ${token}`
    })
    if(!response.data.success){
        throw new Error("failed to show all courses");
    }
    result = response.data.allcourses;
    toast.dismiss(toastId);
    toast.success("Get enrolled courses successfully");
    
   }catch(error){
throw new Error("failed ");
   }
 
    return result;
 
}


export async function getUserEnrolledCourses(token) {
    const toastId = toast.loading("Loading...")
    let result = []
    try {
      const response = await apiconnector(
        "GET",
        GET_USER_ENROLLED_COURSES_API,
        null,
        {
          Authorisation: `Bearer ${token}`,
        }
      )
      // console.log(
      //   "GET_USER_ENROLLED_COURSES_API API RESPONSE............",
      //   response
      // )
  
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      result = response.data.data
    } catch (error) {
      console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error)
      toast.error("Could Not Get Enrolled Courses")
    }
    toast.dismiss(toastId)
    return result
  }


  export async function getInstructorData(token){
    const toastid=toast.loading("Loading.....")
    let result=[];
    try{
      const resp=await apiconnector("GET",GET_INSTRUCTOR_DASHBOARD,null,{
        Authorisation: `Bearer ${token}`,
        
      })
      console.log(resp);
      result=resp?.data.courses;

    }catch(error){

      console.log(error);
      toast.error("Could not Get Instructor Data")
    }
    toast.dismiss(toastid)
    return result;
  }