import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import GetAvgRating from "../../../utils/avgRating"
import RatingStars from "../../Common/RatingStars";

const CourseCard = ({ course, Height }) => {
  const [avgReviewCount,setavgReviewCount]=useState(0);
console.log(course);

  useEffect(() => {
  const count=GetAvgRating(course.ratingandreviews);
  setavgReviewCount(count);
  }, [course])
  // console.log("coursecard"+course)
  console.log(course?.coursedescription);
  return (
    <div className="flex flex-col gap-3">
      <Link to={`/course/${course._id}`}>
      {
        console.log(course._id)
      }
        <div>
          <div className="flex flex-row relative">
            <img
              src={course?.thumbnail}
              alt="error"
              className={`${Height} w-[20vw] rounded-xl   `}
            ></img>
          </div>

          <div className="text-white flex flex-col relative items-baseline ">
            <p>{course?.coursename}</p>
            <p>{course?.coursedescription}</p>

            <div >
            <div className="flex flex-row gap-2">
            <span className="text-yellow-5">{avgReviewCount||0}</span>
            <RatingStars Review_Count={avgReviewCount}/>
            <span className="text-richblack-400">{course.ratingandreviews.length} Ratings</span>
            </div>
            <p className="text-xl text-richblack-5 relative left-0">Rs. {course?.price}</p>

            </div>
          </div>

        </div>
      </Link>
    </div>
  );
};

export default CourseCard;
