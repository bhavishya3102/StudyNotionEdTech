import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import countrycode from "../../../../data/countrycode.json";
import { useDispatch, useSelector } from "react-redux";
import { updateprofile } from "../../../../services/operations/settingapi";

const UpdateProfile = () => {
  const [loading, setloading] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  function submithandler(formdata) {
    console.log("loging data", formdata);
    dispatch(updateprofile(formdata, token));
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        firstname: "",
        lastname: "",

        contactno: "",
        countrycode: "",
        about: "",
        gender: "",
        dob: "",
      });
    }
  }, [isSubmitSuccessful]);

  return (
    <div className="flex flex-col  bg-richblack-800 px-8 py-7 border-richblack-700  border rounded-lg mt-3">
      <form onSubmit={handleSubmit(submithandler)}>
        <div className="flex flex-col gap-6 mt-8 ">
          <div className="flex flex-row gap-4  text-center w-[100%]">
            <div className="flex flex-col gap-1 items-baseline w-[50%]">
              <label htmlFor="firstname" className="text-white">
                Display Name<sup>*</sup>
              </label>
              <input
                id="firstname"
                name="firstname"
                className="bg-richblack-500 text-white rounded-lg w-full px-6 py-3"
                placeholder="Enter Display name"
                {...register("firstname", { required: true })}
              ></input>
            </div>
            <div className="flex flex-col gap-1 items-baseline w-[50%]">
              <label htmlFor="lastname" className="text-white">
                Last Name<sup>*</sup>
              </label>
              <input
                id="lastname"
                name="lastname"
                className="bg-richblack-500 text-white rounded-lg w-full px-6 py-3"
                placeholder="Enter last name"
                {...register("lastname", { required: true })}
              ></input>
            </div>
          </div>

          <div className="flex flex-row gap-4">
            <div className="flex flex-col gap-1 item-baseline w-[50%]">
              <label htmlFor="dateofbirth" className="text-white">Date of Birth</label>
              <input
                id="dateofbirth"
                name="dateofirth"
                type="date"
                className="bg-richblack-500 text-white rounded-lg w-full px-6 py-3"
                placeholder="Enter Date of Birth"
                {...register("dateofbirth")}
              ></input>
            </div>

            <div className="flex flex-col gap-1 item-baseline w-[50%]">
              <label htmlFor="gender" className="text-white">Gender</label>
              <div className="flex flex-col gap-6">
              <select
              className=" text-richblack-25 bg-richblack-500  rounded-lg  w-full px-6 py-3"
              {...register("gender", { required: true })}
            >
              {["Male","Female","Other"].map((elem, ind) => {
                return (
                  <option key={ind}>
                   {elem}
                  </option>
                );
              })}
            </select>
              </div>
            </div>
          </div>

    <div className="flex flex-row gap-2">
    <div className="flex flex-col gap-2 items-baseline w-[50%] ">
    <label className="text-white">Phone no</label>
    <div className="flex flex-row gap-2">
      <select
        className="w-[80px] text-richblack-25 bg-richblack-500  rounded-lg  px-[15px] py-3"
        {...register("countrycode", { required: true })}
      >
        {countrycode.map((elem, ind) => {
          return (
            <option key={ind}>
              {elem.code}-{elem.country}
            </option>
          );
        })}
      </select>
      <input
        name="contactno"
        id="contactno"
        placeholder="12345-6789"
        type="number"
        className="bg-richblack-500  rounded-lg w-full px-6 py-3 pr-36"
        {...register("contactno", {
          required: { value: true, message: "phone no is required" },
          maxLength: { value: 10, message: "Max length is 10" },
          minLength: { value: 8, message: "Min length is 8" },
        })}
      ></input>
    </div>
  </div>

  <div className=" flex flex-col gap-2 items-baseline w-[50%]">
    <label htmlFor="message" className="text-white">
      About<sup>*</sup>
    </label>

    <input
      id="about"
      name="about"
      className="bg-richblack-500 text-white  rounded-lg w-full px-6 py-3"
      placeholder="Enter about"
      {...register("about", { required: true })}
    ></input>
  </div>
    
    </div>

          <div className="flex justify-end ">
          <button type="submit" className="bg-yellow-100 px-4 py-2 rounded-md flex justify-center w-[12%]   ">
            Save
          </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;
