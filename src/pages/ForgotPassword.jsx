import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {BsArrowLeftShort} from "react-icons/bs"
import { Link } from 'react-router-dom';
import { getResetPasswordToken } from '../services/operations/authapi';

const ForgotPassword = () => {

    const [emailsent,setemailsent]=useState(false);
    const [email,setemail]=useState("");
   
    const {loading}=useSelector((state)=> state.auth);
const dispatch=useDispatch();
    function submithandler(e){
        e.preventDefault();
        console.log("a");
dispatch(getResetPasswordToken(email,setemailsent));
    }
  return (
    <div className='text-white  flex flex-col items-center w-[22vw]  relative left-[40vw] top-[20vh]'>
      {
        loading?(<div>Loading....</div>):(
            <div className='flex flex-col gap-4'>
            {
                emailsent?<h1 className='text-white font-bold text-[1.6rem] '>Check Email</h1>:<h1  className='text-white font-bold text-[1.6rem] '>Reset password</h1>

            }
            {
                emailsent?(
                  <div className='font-semibold text-richblack-100 text-[1.2rem]'>
                  {`We have sent the reset email to
                  ${email}`}
                  </div>
                )
                :<p className='font-semibold text-richblack-100 text-[1.2rem]'>Have no fear. We’ll email you instructions to reset your password. 
                If you dont have access to your email we can try account recovery
                </p>
            }
            <form onSubmit={submithandler}>
            {
                !emailsent && 
                <label>
                <p className='font-bold text-[1.2rem]'>Email Address<sup>*</sup></p>
                <input className=" form-style w-full" type="text" placeholder='Enter Email' name='email' value={email} onChange={(e)=>setemail(e.target.value)}></input>
                </label>
            }
         <div className='flex flex-row justify-between '>
         <button type='submit ' className='mt-2'>
         {
             emailsent?"Resend Email":"Reset Password"
         }
         
         </button>
         
         <div className='flex gap-2 items-center mt-4'>
         <Link to="/login">
         <BsArrowLeftShort/>
         </Link>
         Back to login

         </div>
         </div>
            </form>

            </div>
        )
      }
    </div>
  )
}

export default ForgotPassword
