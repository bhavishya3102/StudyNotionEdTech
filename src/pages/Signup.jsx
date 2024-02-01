import React from 'react'
import Template from "../Components/Common/Template"
import signup from "../assets/Images/signup.webp"
import { useSelector } from 'react-redux'


const Signup = () => {
  const {loading}=useSelector((state)=>state.auth);
  return (
    <div className='bg-richblack-900 '>
   {
    loading?(<div className='spinner'></div>):(
      <Template
      heading="Join the millions learning to code with StudyNotion for free"
      para1="Build skills for today, tomorrow, and beyond. Education to future-proof your career."
      
      formtype="signup"
      image={signup}
      
      
      ></Template>
    )
   }
      
    </div>
  )
}

export default Signup
