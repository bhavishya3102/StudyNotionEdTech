import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IoIosArrowBack } from "react-icons/io";
import {
  UNSAFE_useScrollRestoration,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

const VideoDetailsSidebar = ({ setReviewModal }) => {
  const [activestatus, setactivestatus] = useState("");
  const [videobaractive, setvideobaractive] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { sectionid, subsectionid } = useParams();
  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse);

  console.log(courseSectionData);
  console.log(totalNoOfLectures);
  console.log(subsectionid);
  console.log(completedLectures)
  useEffect(() => {
    const setActiveFlags = () => {
      if (!courseSectionData.length) return;
      const currentSectionInd = courseSectionData.findIndex(
        (data) => data._id === sectionid
      );
      const currentSubSectionInd =
        courseSectionData?.[currentSectionInd] &&
        courseSectionData?.[currentSectionInd].subsection.findIndex(
          (data) => data._id === subsectionid
        );
      const activeSubSectionId =
        courseSectionData[currentSectionInd]?.subsection?.[currentSubSectionInd]
          ?._id;

      setactivestatus(courseSectionData?.[currentSectionInd]?._id);
      setvideobaractive(activeSubSectionId);
    };
    setActiveFlags();
  }, [courseSectionData, courseEntireData, location.pathname]);

  return (
    <div>
      <div className="flex flex-col gap-2 bg-richblack-800 h-full min-w-[20vw]">
        <div className="flex gap-3 pt-4 ">
          <div
            onClick={() => navigate("/dashboard/enrolled-courses")}
            className="flex h-[35px] w-[35px] items-center justify-center rounded-full text-white "
            title="back"
          >
            <IoIosArrowBack size={30} />
          </div>
          <button
            className="bg-yellow-25 px-4 py-3 rounded-sm text-black cursor-pointer"
            onClick={() => setReviewModal(true)}
          >
            Add Review
          </button>
        </div>

        {/**course Details */}

        <div className="flex flex-col text-white">
          <p className="text-lg font-bold pl-10 ">{courseEntireData?.coursename} </p>
          <p className="text-lg pl-12 font-semibold text-white">
            {completedLectures ? completedLectures.length : 0}/
            {totalNoOfLectures}
          </p>
        </div>

        {/**section name */}
        <div className="h-[calc(100vh-5rem)] ">
          {courseSectionData.map((section, i) => {
            return (
              <div
                className="mt-2 cursor-pointer text-sm text-richblack-5"
                key={i}
                onClick={() => setactivestatus(section?._id)}
              >
                <div className="flex flex-col px-5 py-4">
                  <div>{section?.sectionname}</div>

                  <div>
                    {activestatus === section?._id && (
                      <div className="transition-[height] duration-500 ease-in-out">
                        {section?.subsection.map((topic, i) => (
                          <div
                            className={`flex gap-3 px-5 py-2 ${
                              videobaractive === topic?._id
                                ? "bg-yellow-200 font-semibold text-richblack-800"
                                : "hover:bg-richblack-900"
                            }`}
                            key={i}
                            onClick={() => {
                              navigate(
                                `/view-course/${courseEntireData?._id}/section/${section?._id}/subsection/${topic?._id}`
                              );
                              setvideobaractive(topic?._id);
                            }}
                          >
                          <input type="checkbox" checked={completedLectures && completedLectures.includes(topic?._id)} ></input>
                            <span>{topic?.title}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default VideoDetailsSidebar;
