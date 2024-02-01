import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactStars from "react-stars";
import { BsStarFill, BsStar } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import { removeFromCart } from "../../../../Slices/Cartslice";

const RenderCartCourses = () => {
  const { cart, totalItems, total } = useSelector((state) => state.cart);
  console.log(cart);
  const dispatch = useDispatch();
  
  return (
    <div className="flex flex-col gap-6 ">
      {cart.map((course, ind) => {
        return (

 <div className="flex flex-row justify-between w-[45vw] gap-3 bg-richblack-800 px-4  py-2 ">
 <img src={course.coursedetail?.thumbnail} className="h-[148px] w-[220px] rounded-lg "></img>
<div className="flex flex-col gap-2">
<div>
<p>{course.coursedetail?.coursename}</p>
<p>{course.coursedetail?.category?.name}</p>
</div>

<div>
<span>4.9</span>
<ReactStars
  count={5}
  size={20}
  edit={false}
  value={
    course.coursedetail?.ratingandreviews &&
    course.coursedetail?.ratingandreviews.length
  }
  emptyIcon={BsStar}
  fullIcon={BsStarFill}
/>
<span>
  {course.coursedetail?.ratingandreviews.length} Ratings
</span>
</div>
</div>

 <div className="flex flex-col gap-2">
   <button onClick={()=>dispatch(removeFromCart(course.coursedetail._id))}>
     <RiDeleteBin6Line color="red"/>
    
   </button>

   <div>Rs. {course.coursedetail.price}</div>
 </div>
</div>

        );
      })}
    </div>
  );
};

export default RenderCartCourses;
