import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getresetpassword } from '../services/operations/authapi';
import { Link } from 'react-router-dom';
const UpdatePassword = () => {
    const [formdata,setformdata]=useState({password:"",confirmpassword:""});
    const {loading}=useSelector((state)=> state.auth);
    const dispatch=useDispatch();

const location =useLocation();
    const {password,confirmpassword}=formdata;

    function changehandler(e){
        e.preventDefault();
        return setformdata((prev)=>(
            {
                ...prev,
                [e.target.name]:e.target.value
            }
        ))
    }

    function submithandler(e){
        e.preventDefault();
        const token=location.pathname.split("/").at(-1);
dispatch(getresetpassword(password,confirmpassword,token));
    }
  return (
    <div className='text-white flex flex-col relative left-[40vw] w-[25vw] top-[20vh]'>
      <h1 className='font-bold text-[1.9rem]'>
      Choose new Password
      </h1>
      <p className='text-[1.2rem] font-semibold text-richblack-200'>Almost done. Enter your new password and youre all set.</p>
      <form onSubmit={submithandler}>
      <label>
      <p className='font-bold text-[1.2rem]' >New Password<sup>*</sup></p>
      <input type="password" name="password" className="form-style w-full" value={password} onChange={changehandler} ></input>
      </label>

      <label>
      <p className='font-bold text-[1.2rem]'>Confirm New Password<sup>*</sup></p>
      <input type="password" name="confirmpassword" value={confirmpassword} onChange={changehandler} className='form-style w-full'></input>
      </label>

<div className='flex justify-between  mt-4'>
<button type='submit' className='bg-richblack-500 px-4 py-2 rounded-md'>
Reset Password
</button>


<Link to="/login"  className='bg-richblack-500 px-4 py-2 rounded-md'>
Back to Login
</Link>
</div>
      </form>


    </div>
  )
}

export default UpdatePassword
