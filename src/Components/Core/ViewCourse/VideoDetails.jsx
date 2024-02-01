import React, { useEffect, useRef, useState } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Player,BigPlayButton } from "video-react";
import { markLectureAsComplete } from "../../../services/operations/courseDetailsAPI";
import { updateCompletedLectures } from "../../../Slices/viewCourseSlice";

const VideoDetails = () => {
  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse);
  const { courseid, sectionid, subsectionid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const playerRef = useRef();
  const { token } = useSelector((state) => state.auth);
  const [videodata, setvideodata] = useState([]);
  const [videoended, setvideoended] = useState(false);
  const [loading, setloading] = useState(false);

  // when  sectiondata is change due to click on other section or change in entire data,
  // or change in the url then call the function setvideospecificdetails function
  useEffect(() => {
    const setVideoSpecificDetails = async () => {
      if (!courseSectionData.length) {
        return;
      }
      if (!courseid || !sectionid || !subsectionid) {
        navigate("/dashboard/enrolled-courses");
      } else {
        // let assume all fields are present

        // get the data in the form of array in filterdata of particular sectionid
        const filterdata = courseSectionData.filter(
          (section) => section._id === sectionid
        );

        // get the subsection data that is selected
        const filteredvideodata = filterdata?.[0].subsection.filter(
          (subsection) => subsection._id === subsectionid
        );
        setvideodata(filteredvideodata[0]);
        setvideoended(false);
      }
    };

    setVideoSpecificDetails();
  }, [courseSectionData, courseEntireData, location.pathname]);

  // if video is first then not show prev button
  const isFirstVideo = () => {
    const sectionindex = courseSectionData.findIndex(
      (data) => data._id === sectionid
    );
    const subsectionindex = courseSectionData[
      sectionindex
    ]?.subsection.findIndex((data) => data._id === subsectionid);

    if (sectionindex === 0 && subsectionindex === 0) {
      return true;
    } else {
      return false;
    }
  };
  // if video is last then not show next button
  const isLastVideo = () => {
    const sectionindex = courseSectionData.findIndex(
      (data) => data._id === sectionid
    );
    // find no of subsection
    const noofsubsections = courseSectionData[sectionindex].subsection.length;
    const subsectionindex = courseSectionData[
      sectionindex
    ]?.subsection.findIndex((data) => data._id === subsectionid);

    if (
      sectionindex === courseSectionData.length - 1 &&
      subsectionindex === noofsubsections - 1
    ) {
      return true;
    } else {
      return false;
    }
  };

  const goTONextVideo = () => {
    const sectionindex = courseSectionData.findIndex(
      (data) => data._id === sectionid
    );
    // find no of subsection
    const noofsubsections = courseSectionData[sectionindex].subsection.length;
    const subsectionindex = courseSectionData[
      sectionindex
    ]?.subsection.findIndex((data) => data._id === subsectionid);

    if (subsectionindex !== noofsubsections - 1) {
      // it means within  same section and next video
      const nextsubsectionid =
        courseSectionData[sectionindex].subsection[subsectionindex + 1]._id;
      // navigate to next video
      navigate(
        `/view-course/${courseid}/section/${sectionid}/subsection/${nextsubsectionid}`
      );
    } else {
      // it means this is the last video so next video in next section
      // it means different(next) section first video
      const nextsectionid = courseSectionData[sectionindex + 1]._id;
      const nextsubsectionid =
        courseSectionData[sectionindex + 1].subsection[0]._id;
      // navigate to next video
      navigate(
        `/view-course/${courseid}/section/${nextsectionid}/subsection/${nextsubsectionid}`
      );
    }
  };
  const goToPrevVideo = () => {
    const sectionindex = courseSectionData.findIndex(
      (data) => data._id === sectionid
    );
    // find no of subsection
    const noofsubsections = courseSectionData[sectionindex].subsection.length;
    const subsectionindex = courseSectionData[
      sectionindex
    ]?.subsection.findIndex((data) => data._id === subsectionid);

    if (subsectionindex !== 0) {
      // it means within  same section and prev video
      const prevsubsectionid =
        courseSectionData[sectionindex].subsection[subsectionindex - 1]._id;
      // navigate to next video
      navigate(
        `/view-course/${courseid}/section/${sectionid}/subsection/${prevsubsectionid}`
      );
    } else {
      // it means this is the first video so prev video in next section
      // it means different(prev) section last video
      const prevsectionid = courseSectionData[sectionindex - 1]._id;
      const prevsubsectionlength =
        courseSectionData[sectionindex - 1].subsection.length;
      const prevsubsectionid =
        courseSectionData[sectionindex -1].subsection[prevsubsectionlength - 1]
          ._id;
      // navigate to next video
      navigate(
        `/view-course/${courseid}/section/${prevsectionid}/subsection/${prevsubsectionid}`
      );
    }
  };
  console.log(videodata);
  console.log(completedLectures)
  const handleLectureCompletion = async () => {
    // Todo: 
    setloading(true)
    const response=await markLectureAsComplete({courseid,subsectionid},token);
// update the updatecompleted Lectures state when mark as completed


    if(response){
  dispatch(updateCompletedLectures(subsectionid))
}

setloading(false)
  };

  return (
    <div>
      {!videodata ? (
        <div>No data found</div>
      ) : (
        <div className="text-white">
          <Player
            ref={playerRef}
            aspectRatio="16:9"
            onEnded={() => setvideoended(true)}
            playsInline
            src={videodata?.videourl}
          >
         <BigPlayButton position="center" />

          {/*** if video is ended then check if subsection id is in completed lectures array to track the 
completion of video if it is not present then show mark as completed button otherwise not 
shown  */}

          {videoended && (
            <div>
              {completedLectures && !completedLectures.includes(subsectionid) && (
                <button  className="bg-yellow-25 px-4 py-2" onClick={() => handleLectureCompletion()}>
                  Mark as Completed
                </button>
              )}
              {/** this is rewatch button it is show if video is ended in this we use useref hook to restart
the video we use seek(0) function of useref hook to start the video from start 

seek(0) means video ko dubara se 0 se start karna h
*/}
              <button
              className="bg-yellow-25 px-4 py-2"
                onClick={() => {
                  if (playerRef?.current) {
                    playerRef.current?.seek(0);
                    setvideoended(false);
                  }
                }}
              >
                Rewatch
              </button>

              {/** prev and next button */}
              <div>
                {!isFirstVideo() && (
                  <button  className="bg-yellow-25 px-4 py-2" onClick={goToPrevVideo}>Prev</button>
                )}
                {!isLastVideo() && (
                  <button  className="bg-yellow-25 px-4 py-2" onClick={goTONextVideo}>Next</button>
                )}
              </div>
            </div>
          )}
          </Player>
        </div>
      )}

      <h1 className="text-white font-bold">{videodata?.title}</h1>
      <p  className="text-white font-semibold">{videodata?.description}</p>
    </div>
  );
};

export default VideoDetails;
