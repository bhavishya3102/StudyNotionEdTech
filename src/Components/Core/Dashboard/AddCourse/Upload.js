import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useDropzone } from "react-dropzone";
import { Player } from "video-react";
import { FiUploadCloud } from "react-icons/fi";
import "video-react/dist/video-react.css"


const Upload = ({
  name,
  label,
  register,
  errors,
  setValue,
  video = false,
  viewData = null,
  editData = null,
}) => {
  const { course } = useSelector((state) => state.course);
  const [selectedfiles, setselectedfiles] = useState(null);
  const [previewSource, setpreviewSource] = useState(
    viewData ? viewData : editData ? editData : ""
  );

  // it means if viewdata is true then viewdata executes
  // and view data false then edit data executes ,and check
  // if editdata is true then edit data executes and false then
  // "" is execute
  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      previewFile(file);
      setselectedfiles(file);
    }
  };

  const inputRef = useRef(null);

  // const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: !video
      ? { "image/*": [".jpeg", ".jpg", ".png",".pdf"] }
      : { "video/*": [".mp4"] },
    onDrop,
  })
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setpreviewSource(reader.result);
    };
  };

  useEffect(() => {
    register(name, { required: true });
  }, [register]);

  useEffect(() => {
    setValue(name, selectedfiles);
  }, [selectedfiles,setValue]);

  return (
    <div>
      <label htmlFor={name} className="text-[1.2rem] text-richblack-25 font-bold">{label}</label>

      <div
        className={`${
          isDragActive ? "bg-richblack=-600" : "bg-richblack-700"
        } flex min-h-[250px] cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-richblack-500`}
      >
        {previewSource ? (
          <div className="flex w-full flex-col p-6">
            {!video ? (
              <img
                src={previewSource}
                alt="Preview"
                className="h-full w-full rounded-md object-cover"
              ></img>
            ) : (
              <Player
                aspectRatio="16:9"
                playsInline
                src={previewSource}
              
              />
            )}
            {!viewData && (
              <button
                type="button"
                onClick={() => {
                  setpreviewSource("");
                  setselectedfiles(null);
                  setValue(name, null);
                }}
                className=" mt-3 text-richblack-400 underline"
              >
                Cancel
              </button>
            )}
          </div>
        ) : (
          <div
            className="flex w-full flex-col items-center p-6"
            {...getRootProps()}
          >
            <input {...getInputProps()} ref={inputRef} />

            <div>
              <FiUploadCloud className="text-2xl text-yellow-50"></FiUploadCloud>
            </div>
            <p className="mt-2 max-w-[200px] text-center text-sm text-richblack-200">
              Drag and drop an {!video ? "image" : "video"}, or click to{" "}
              <span className="font-semibold text-yellow-50">Browse</span> a
              file
            </p>
            <ul className="mt-10 flex list-disc justify-between space-x-12 text-center  text-xs text-richblack-200">
              <li>Aspect ratio 16:9</li>
              <li>Recommended size 1024x576</li>
            </ul>
          </div>
        )}
      </div>
      {
        errors[name]&&(
            <span>
            {label} is required
            </span>
        )
      }
    </div>
  );
};

export default Upload;
