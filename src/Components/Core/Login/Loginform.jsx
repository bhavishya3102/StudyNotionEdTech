import React, { useState } from 'react'
import {AiOutlineEyeInvisible,AiOutlineEye}  from 'react-icons/ai';
import CTAButton from "../../../Components/Core/HomePage/Button"
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {login} from "../../../services/operations/authapi"


const Loginform = () => {

  const [formdata,setformdata]=useState({email:"",password:""});
  const [isvisible,setisvisible]=useState(false);
  const dispatch=useDispatch();
  const navigation=useNavigate();


  /**return { ...prev, [name]: value }: This line returns a new object
   *  that represents the updated state of the form data. It uses the spread operator
   *  (...prev) to copy all properties from the previous state object (prev). Then, it
   *  updates the property specified by the name variable with the new value. The square 
   * brackets around [name] are used for dynamic property names in JavaScript object 
   * literals. */


  /**const propertyName = 'example';
const obj = {
  [propertyName]: 'dynamic value'
};

console.log(obj); // Output: { example: 'dynamic value' }

*/

  function changehandler(event){
    const {name,value}=event.target;

    setformdata((prev)=>{
      return{
        ...prev,
        [name]:value
      }
    })

  }

function submithandler(e){
  e.preventDefault();
  const {email,password}=formdata;
  dispatch(login(email,password,navigation));
}

  function toggle(){
    if(isvisible){
      setisvisible(false);
    }
    else{
      setisvisible(true);
    }
  }
  return (
    <div className='flex flex-col w-full'>
    <form onSubmit={submithandler}>
    
    <div className='flex flex-col items-start gap-4 w-fit'>
    <label>
    <p className='text-richblack-200 '>Email <sup>*</sup></p>
    <input placeholder='Enter Your Email' name='email' className=" rounded-lg  bg-richblack-700 text-white px-[20px] py-[12px] pr-40" onChange={changehandler} value={formdata.email}></input>
    
    </label>

    <label>
    <p className='text-richblack-200 '>password <sup>*</sup></p>
    <div className='relative flex-row items-center'>
    <input placeholder='Enter Password' type={`${isvisible?"text":"password"}`}   name='password'  className="  pr-40 rounded-lg bg-richblack-700 text-white px-[20px] py-[12px] w-full" onChange={changehandler} value={formdata.password}></input>
   <div className='text-white absolute right-12 flex -translate-y-[30px]' onClick={()=>toggle()}>
   {
    isvisible?<AiOutlineEyeInvisible/>:<AiOutlineEye/>
  }
   </div>
    </div>
    
    </label>

    <div className='text-blue-400 translate-x-64 '>
    <Link to="/forgotpassword">
    Forgot password
    </Link>
    </div>

    <button
    type="submit"
    className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
  >
    Sign In
  </button>
    </div>
    </form>
    
    </div>
  
  )
}

export default Loginform
