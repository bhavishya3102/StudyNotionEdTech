import React, { useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { setsignupdata } from "../../../Slices/authslice";
import {toast} from 'react-toastify';
import { useDispatch } from "react-redux";
import {  useNavigate } from "react-router-dom";
import {sendotp} from "../../../services/operations/authapi"

const Signupform = () => {
  const [formdata, setformdata] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    password: "",
    confirmpassword: "",
    email:""
  });

  const {firstname,lastname,phone,password,confirmpassword,email}=formdata;
  const [isvisible, setisvisible] = useState(false);
  const [isvisible1, setisvisible1] = useState(false);
  const [accounttype,setaccounttype]=useState("Student");
  const dispatch=useDispatch();
  const navigate=useNavigate();
  console.log(accounttype);

  function changehandler(event) {
    const { name, value, type } = event.target;

    setformdata((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }


  function submithandler(e){
    e.preventDefault();
    if(password!=confirmpassword){
      toast.error("Password not matching");
      return ;
    }
    const signupdata= {...formdata,accounttype};

    // call the setsignup reducer from auth slice
    dispatch(setsignupdata(signupdata));
    // send otp using dispatch hook
    dispatch(sendotp(formdata.email,navigate));

    // reset the form 
    setformdata({
      firstname:"",lastname:"",phone:"",password:"",confirmpassword:"",email:""
    })
    setaccounttype("Student");

  }
  function toggle() {
    if (isvisible) {
      setisvisible(false);
    } else {
      setisvisible(true);
    }
  }

  function toggle1() {
    if (isvisible1) {
      setisvisible1(false);
    } else {
      setisvisible1(true);
    }
  }
  return (
    <div className="flex flex-col gap-6">

    
          {/**button */}
          <div className="bg-richblack-700 duration-200 transition-all  px-6 py-2 rounded-[50px] -translate-x-2 text-richblack-100 w-fit font-bold ">
            <div className="flex flex-row items-center">
              {["Student", "Instructor"].map((elem, ind) => {
                return (
                  <button  key={ind} onClick={()=>setaccounttype(elem)}className=" hover:bg-richblack-900  text-richblack-100 px-6 py-1 rounded-[50px]">
                    {elem}
                    
                  </button>
                );
              })}
            </div>
          </div>
     <form onSubmit={submithandler}>
     <div className="flex flex-row items-center gap-4">
     <label>
       <p className="text-richblack-200 ">
         First Name <sup>*</sup>
       </p>
       <input
         placeholder="Enter First Name"
         className=" rounded-lg bg-richblack-700 text-white px-[20px] py-[12px] w-full"
         name="firstname"
         onChange={changehandler}
         value={firstname}
       ></input>
     </label>

     <label>
     <p className="text-richblack-200 ">
       Last Name <sup>*</sup>
     </p>
     <input
     className=" rounded-lg bg-richblack-700 text-white px-[20px] py-[12px] w-full"
       placeholder="Enter Last Name"
       name="lastname"
       onChange={changehandler}
       value={lastname}
     ></input>
   </label>

    
   </div>

   <label>
   <p className='text-richblack-200 '>Email <sup>*</sup></p>
   <input placeholder='Enter Email' name='email' onChange={changehandler} className=" rounded-lg bg-richblack-700 text-white px-[20px] py-[12px] w-full" value={email}></input>
   
   </label>
   <label>
   <p className='text-richblack-200 '>Phone No <sup>*</sup></p>
   <input placeholder='Enter Phone no' name='phone' onChange={changehandler} className=" rounded-lg bg-richblack-700 text-white px-[20px] py-[12px] w-full" value={phone}></input>
   
   </label>

   <div className="flex flex-row gap-4">
   <label>
   <p className="text-richblack-200 ">
     Create Password <sup>*</sup>
   </p>
   <div className="relative">
     <input
     className=" rounded-lg bg-richblack-700 text-white px-[20px] py-[12px] w-full"
       placeholder="Create Password"
       type={`${isvisible ? "text" : "password"}`}
       name="password"
       
       onChange={changehandler}
       value={password}
     ></input>
     <div
       className="text-white absolute translate-x-[196px] -translate-y-[30px]"
       onClick={() => toggle()}
     >
       {isvisible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
     </div>
   </div>
 </label>
 <label>
 <p className="text-richblack-200 ">
   Confirm Password <sup>*</sup>
 </p>
 <div className="relative">
   <input
   className=" rounded-lg bg-richblack-700 text-white px-[20px] py-[12px] w-full"
     placeholder="Enter confirm password"
     type={`${isvisible1 ? "text" : "password"}`}
     name="confirmpassword"
     
     onChange={changehandler}
     value={confirmpassword}
   ></input>
   <div
     className="text-white absolute translate-x-[220px] -translate-y-[30px]"
     onClick={() => toggle1()}
   >
     {isvisible1 ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
   </div>
 </div>
</label>

   </div>
<div className="w-fit items-center">

<button
type="submit"
className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
>
Create Account
</button>
</div>
     
     </form>
    </div>
  );
};
export default Signupform;
