import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { courses } from "../services/apis";
import { apiconnector } from "../services/apioperator";
import { catalogPageData } from "../services/operations/categoryPage";
import CourseSlider from "../Components/Core/Catalog/CourseSlider";
import CourseCard from "../Components/Core/HomePage/CourseCard";
import Footer from "../Components/Common/Footer";
import RatingStars from "../Components/Common/RatingStars";
import GetAvgRating from "../utils/avgRating";

const Catalog = () => {
  const categoryname = useParams();
  console.log(categoryname)   //{ catalogname: 'data-structure' }
  const [categoryPageData, setcategoryPageData] = useState(null);
  const [categoryId, setcategoryId] = useState("");
  const [active, setactive] = useState(1);
  const [avgReviewCount,setavgReviewCount]=useState(0);

  

  useEffect(() => {
    const getallcategories = async () => {
      const resp = await apiconnector("GET", courses.GETALLCATEGORIES);
      const categoryid = resp?.data?.allcategories.filter((cat) => {
        // console.log(cat.name.toLowerCase());
        // console.log(categoryname.catalogname);
        return (
          cat.name.split(" ").join("-").toLowerCase() ===
          categoryname.catalogname
        );
      })[0]._id
      console.log("categoryid", categoryid);
      setcategoryId(categoryid);
    };

    getallcategories();
  }, [categoryname]);

  
  

  useEffect(() => {
    const getcategorypagedata = async () => {
      try {
        const resp = await catalogPageData(categoryId);
        console.log(resp);


  setcategoryPageData(resp);

      } catch (error) {
        console.log(error);
      }
    };
    getcategorypagedata();
  }, [categoryId]);

  return (
    <div className="text-white  bg-richblack-800 w-[11/12] ">
      <div className=" py-6 flex flex-col gap-3 ">
        <p className="text-[20px] text-richblack-200 font-semibold">{`Home/Catalog/`} <span className="text-yellow-25">{categoryname.catalogname}</span></p>
        <p className="text-3xl text-richblack-5">{`${categoryname.catalogname}`}</p>
        {console.log(categoryPageData?.mostSellingCourses)
        
        }
        
        <p className="text-[15px] text-richblack-5">{categoryPageData?.specificcategory?.description}</p>
      </div>

     <div className=" bg-richblack-900">
      {/**section 1 */}
      <div className="pt-5">
        <div className="text-[2rem] text-richblack-25 font-bold">Courses to get you started</div>
        <div className="flex flex-row ">
          <p
            className={`px-4 py-2 ${
              active === 1
                ? "border-b border-b-yellow-25 text-yellow-25"
                : " text-richblack-50"
            } cursor-pointer`}
            onClick={() => setactive(1)}
          >
            {" "}
            Most Popular
          </p>

          <p
            className={`px-4 py-2 ${
              active === 2
                ? "border-b border-b-yellow-25 text-yellow-25"
                : " text-richblack-50"
            } cursor-pointer`}
            onClick={() => setactive(2)}
          >
            {" "}
            New
          </p>
        </div>
        <div className="h-[1px] w-100vw bg-richblack-200"></div>

        <div className=" pt-6 ">
          <CourseSlider
            courses={categoryPageData?.specificcategory?.course}
          ></CourseSlider>
        </div>
      </div>

      {/**section 2 */}
      <div className="text-[2rem] text-richblack-25 font-bold pt-24">
        <div>
          Top courses in {categoryPageData?.differentcategory?.name}
        </div>
        <div>
          <CourseSlider
            courses={categoryPageData?.differentcategory?.course}
          ></CourseSlider>
        </div>
      </div>
      {/**section 3 */}
      <div className="pt-24 pb-24">
        <div className="text-[2rem] text-richblack-25 font-bold">Frequently Bought</div>
        <div className="flex flex-row gap-5  flex-wrap">
        {
          categoryPageData?.mostSellingCourses.map((course,i) =>
          (
            <Link to={`/course/${course._id}`} key={i}>
            <div>
              <div className="flex flex-row relative">
                <img
                  src={course?.thumbnail}
                  alt="error"
                  className={`h-[30vh] w-[25vw] rounded-xl   `}
                ></img>
              </div>
    
              <div className="text-white flex flex-col relative items-baseline ">
                <p>{course?.coursename}</p>
                <p>{course?.coursedescription}</p>
    
                <div >
                <div className="flex flex-row gap-2">
                <span className="text-yellow-5">{GetAvgRating(course.ratingandreviews)||0}</span>
                <RatingStars Review_Count={GetAvgRating(course.ratingandreviews)}/>
                <span className="text-richblack-400">{course.ratingandreviews.length} Ratings</span>
                </div>
             
                <p className="text-xl text-richblack-5 left-0 relative">Rs. {course?.price}</p>
    
                </div>
              </div>
    
            </div>
          </Link>
          ))
        }
        </div>

        </div>
     </div>
     <Footer/>
    </div>
  );
};

export default Catalog;
