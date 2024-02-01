import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RiEditBoxLine } from "react-icons/ri";

const Profile = () => {
  const { user, loading: profileloading } = useSelector(
    (state) => state.profile
  );
  const dispatch = useDispatch();

  const { logoutbtn } = useSelector((state) => state.blur);
  console.log(logoutbtn);
  console.log("profile", user);
  console.log("A");
  return (
    <div className={`flex flex-col gap-4  ${logoutbtn?"blur-lg":"blur-none"}`}>
      <h1 className="text-white font-bold font-inter text-[1.8rem]">
        My Profile
      </h1>
      {/**first box */}
      <div className="flex flex-row gap-4 bg-richblack-800 px-8 py-7 border-richblack-700  border rounded-lg justify-between">
        <div className="flex flex-row gap-6">
          <img src={user?.image} className="h-12 w-12 rounded-full"></img>

          <div className="flex flex-col gap-2">
            <p className="text-white">{`${user.firstname} ${user.lastname}`}</p>
            <p className="text-richblack-200">{user.email}</p>
          </div>
        </div>

        <button>
          <div className="flex flex-row gap-2 bg-yellow-300 px-4 py-2 rounded-md">
            <RiEditBoxLine />
            <p>Edit</p>
          </div>
        </button>
      </div>

      {/** second box */}
      <div className="flex flex-col gap-4 bg-richblack-800 border-richblack-700  border rounded-md  px-8 py-7">
        <div className="flex flex-row justify-between">
          <div className="text-white text-[1.6rem] font-bold">Personal Details</div>
          <button>
            <div className="flex flex-row gap-2 bg-yellow-300 px-4 py-2 rounded-md">
              <RiEditBoxLine />
              <p>Edit</p>
            </div>
          </button>
        </div>

        <div className="flex flex-row gap-2 mt-4 w-[40vw] justify-between">
          <div>
          <p className="text-richblack-400 font-bold font-inter">First Name</p>
          <p  className="text-white  font-inter">{user.firstname}</p>
          </div>
          <div className="">
          <p  className="text-richblack-400 font-bold font-inter">Last Name</p>
          <p className="text-white  font-inter">{user.lastname}</p>
          </div>
        </div>

        <div className="flex flex-row gap-2  w-[43.4vw] justify-between">
        <div>
        <p  className="text-richblack-400 font-bold font-inter">Email</p>
        <p className="text-white  font-inter">{user.email}</p>
        </div>
        <div className="">
        <p  className="text-richblack-400 font-bold font-inter">Phone no</p>
        <p className="text-white  font-inter">{user?.additionaldetails?.contactno ?? " Add the Phone no"}</p>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Profile;
