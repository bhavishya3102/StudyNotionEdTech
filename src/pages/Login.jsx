import React from 'react'
import Template from "../Components/Common/Template"
import login from "../assets/Images/login1.webp"
const Login = () => {
  return (
    <div className='w-11/12 flex items-center bg-richblack-900 '>
    <Template
    heading="Welcome Back"
    para1="Build skills for today, tomorrow, and beyond. Education to future-proof your career."

    formtype="login"
    image={login}
    
    
    ></Template>
      
    </div>
  )
}

export default Login

