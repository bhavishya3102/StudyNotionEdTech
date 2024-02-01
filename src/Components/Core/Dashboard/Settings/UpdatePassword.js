import React, { useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { changepassword } from "../../../../services/operations/settingapi";

const UpdatePassword = () => {
  const [isvisible, setisvisible] = useState(false);
  const [isvisible1, setisvisible1] = useState(false);

  const [formdata,setformdata]=useState({oldpassword:"",newpassword:""})
  const dispatch=useDispatch();
  const {token}=useSelector((state)=>state.auth);

  function changehandler(event) {
    const { name, value, type } = event.target;
   

    setformdata((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
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

  function submithandler(){

    dispatch(changepassword( formdata,token));
  }
  return (
    <div>
    
      <div className="bg-richblack-800 px-8 py-7 border-richblack-700  border rounded-lg mt-2">
<form onSubmit={submithandler}>
<div className="flex flex-row gap-4 ">
          <label className="w-[50%]">
            <p className="text-richblack-200 ">
              Current Password <sup>*</sup>
            </p>
            <div className="relative">
              <input
                className=" rounded-lg bg-richblack-700 text-white px-[20px] py-[12px] w-full"
                placeholder="Current Password"
                type={`${isvisible ? "text" : "password"}`}
                name="oldpassword"
                onChange={changehandler}
                value={formdata.oldpassword}
              ></input>
              <div
                className="text-white absolute translate-x-[196px] -translate-y-[30px]"
                onClick={() => toggle()}
              >
                {isvisible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </div>
            </div>
          </label>
          <label className="w-[50%]">
          <p className="text-richblack-200 ">
            New Password <sup>*</sup>
          </p>
          <div className="relative">
            <input
              className=" rounded-lg bg-richblack-700 text-white px-[20px] py-[12px] w-full"
              placeholder="Enter new password"
              type={`${isvisible1 ? "text" : "password"}`}
              name="newpassword"
              onChange={changehandler}
              value={formdata.newpassword}
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
<div className="flex justify-end">
<button type="submit" className="bg-yellow-100 px-4 py-2 rounded-md flex justify-center w-[12%]  mt-6  ">Save</button>


</div>
</form>

       </div>
    </div>
  );
};

export default UpdatePassword;
