import React from "react";
import frame from "../../assets/Images/frame.png"
import Loginform from "../../Components/Core/Login/Loginform"
import Signupform from "../../Components/Core/Signup/Signupform"
import { useSelector } from "react-redux";


const Template = ({ heading, para1, formtype, image }) => {
  const {loading}=useSelector((state)=> state.auth);
  return (
    <div>
{
  loading?(<div>Loading...</div>):(
    <div className="flex flex-row gap-4">
    {/**left part */}
    <div className="w-[50%] flex flex-col items-start pl-60 gap-5 text-[1rem] mt-24">
      <div className="text-[1.8rem] text-white font-inter font-bold">{heading}</div>
      <div className="text-[1rem] text-richblack-400 font-inter font-bold w-[80%]">{para1}</div>



      {/**form type */}
      <div>
      {
        formtype==="signup"?<Signupform/>:<Loginform/>

      }
      
      </div>
    </div>
    {/**right part */}
    <div className="relative mt-24 w-[50%] flex flex-col items-center">
    <img src={frame} className="relative" alt="error"></img>
    <img src={image} className="absolute top-0 -translate-x-6 -translate-y-6" alt="error"></img>
    
    
    </div>
  </div>
  )
}
    </div>
  );
};

export default Template;
