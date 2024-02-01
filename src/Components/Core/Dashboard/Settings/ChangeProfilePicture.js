import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiUpload } from "react-icons/fi";
import { updatedisplaypicture } from "../../../../services/operations/settingapi";
const ChangeProfilePicture = () => {
  const inputref = useRef(null);
  const [image, setimage] = useState(null);
  const [preview, setpreview] = useState(null);

  const { user, loading } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  function handleclick() {
    inputref.current.click();
  }

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setpreview(reader.result);
    };
  };

  function changehandle(e) {
    const file = e.target.files[0];
    if (file) {
      setimage(file);
      previewFile(file);
    }
  }

  function handleupload(e) {
    e.preventDefault();
    console.log("a");
    console.log(image);
    const formdata = new FormData();
    console.log("b");
    formdata.append("displaypicture", image);
    console.log("formdata", formdata);

    dispatch(updatedisplaypicture(formdata, token));
  }

  return (
    <div className="text-white">
      {loading ? (
        <div className="text-white">loading...........</div>
      ) : (
        <div className="flex flex-row gap-10 bg-richblack-800 px-8 py-7 border-richblack-700  border rounded-lg ">
          {/**Image */}
          <div>
            <img
              src={preview || user?.image}
              alt="error"
              className=" h-24 w-24 object-cover bg-white rounded-full "
            />
            <input
              type="file"
              ref={inputref}
              onChange={changehandle}
              accept="image/png, image/gif, image/jpeg"
              className=" hidden"
            />
          </div>

          {/**button section */}
          <div className="flex flex-col gap-2 mt-4">
            <h1 className="text-[1.2rem] font-bold font-inter">
              Change Profile Picture
            </h1>

            {/**change button */}
            <div className="flex flex-row gap-4">
              <button
                className=" flex flex-row gap-2 bg-richblack-400 px-4 py-2 rounded-md"
                onClick={handleclick}
              >
                Change
              </button>
              <button
                className="flex flex-row gap-2 bg-yellow-100 px-4 py-2 rounded-md text-black"
                onClick={handleupload}
              >
                Upload
                <FiUpload className="text-lg text-richblack-900" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChangeProfilePicture;
