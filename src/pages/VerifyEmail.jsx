import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import OtpInput from "react-otp-input"
import { useState } from 'react';
import { sendotp } from '../services/operations/authapi';

import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import {signup} from "../services/operations/authapi"

const VerifyEmail = () => {
 
    const [otp,setotp]=useState("");
    const dispatch=useDispatch();
    const navigation=useNavigate();
    const {signupdata,loading}=useSelector((state)=>state.auth);
    console.log(signupdata);

    useEffect(() => {
      if(!signupdata){
        navigation("/signup");
      }
    }, []);
    function submithandler(e){
      e.preventDefault();
      const {firstname,lastname,email
        ,password,confirmpassword,
        accounttype}= signupdata;

        console.log(signupdata);
        console.log(firstname);
        
dispatch(signup(firstname,lastname,email
  ,password,confirmpassword,
  accounttype,otp,navigation));


    }

  return (
    <div className='text-white flex flex-col items-center justify-center top-[20vh] relative'>
      {
        loading?(
          <div className=''>
          <div className="spinner"></div>
          </div>
        ):(<div>
         <form onSubmit={submithandler} className="max-w-[500px] p-4 lg:p-8">
         <h1 className='text-[3rem] font-bold '>Verify Email</h1>
         <p className='font-semibold text-[1.2rem] text-richblack-200 my-4'>A verification code has been sent to you. Enter the code below</p>
         <OtpInput
        
         value={otp}
         onChange={setotp}
         numInputs={6}
        
         renderInput={(props) => (<input {...props}     placeholder="-"
         style={{
          boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
        }}
         className="w-[48px]  border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
        
         />)}
         containerStyle={{
          justifyContent: "space-between",
          gap: "0 6px",
        }}
        
       />
         
         <button type='submit' className='w-full bg-yellow-25 my-4 rounded-md px-4 py-2 text-black font-bold'>Verify Email</button>
         <div className='flex justify-between'>
         <div>
     <Link to="/signup">
     <button className='text-[1.1rem] text-semibold'>Back to Signup</button>
     </Link>
         </div>
         <div>
         <button onClick={()=>dispatch(sendotp(signupdata.email))} className='text-[1.1rem] text-semibold text-blue-400'>
         Resend it
         </button> 
         </div>
         </div>
         </form>
      
          



            </div>)
      }
    </div>
  )
}

export default VerifyEmail
