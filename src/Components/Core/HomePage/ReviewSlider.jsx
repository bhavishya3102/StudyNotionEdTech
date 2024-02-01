import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import ReactStars from "react-stars";

import { Pagination, Navigation, Autoplay, FreeMode } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import "swiper/css/free-mode";
import "../../../App.css";
import { getreviews } from "../../../services/operations/courseDetailsAPI";

const ReviewSlider = ({ review }) => {
    const [reviewdata,setreviewdata]=useState([]);

    useEffect(() => {
        const fetchreview=async()=>{
          try{
            const resp=await getreviews();
            setreviewdata(resp);
          }
          catch(error){
            console.log(error)
          }
        
        }
        
        fetchreview();
        }, [])


  return (
    <div className="text-white w-11/12 max-w-maxContent">
    <div className="my-[50px] h-[184px] max-w-maxContentTab lg:max-w-maxContent">
    
    {
      <Swiper
           
      spaceBetween={25}
     slidesPerView={3}
      loop={true}
      freeMode={true}
      autoplay={{
        delay:2500,
        disableOnInteraction:false
      }}
    className="w-full"
    
      modules={[Pagination,Autoplay,FreeMode]}
      
    >
    {
      reviewdata.map((review,i) => (
        <SwiperSlide key={i} className="flex flex-row gap-2 p-3" >
        <div className="flex flex-col text-[14px] text-richblack-25  bg-richblack-800 h-[35vh] p-6 w-[35vw] gap-3">
        <div className="flex items-center gap-4">
  
  <img src={review.user.image} className="h-[15vh] w-[7vw] object-cover rounded-full p-4"></img>
  
  
        <div>
            <h1 className="w-full font-bold text-[1.3rem]">{review.user.firstname} {review.user.lastname}</h1>
            <p>{review.user.email}</p>
          </div>
        </div>
        <p className="font-bold text-[1.2rem]">{review.review}</p>
  
        <div className="flex flex-row gap-2 items-center">
        <p className="text-white">{review.rating}</p>
        <ReactStars
        count={5}
        value={review.rating}
        size={20}
        edit={false}
        activeColor="#ffd700"
        emptyIcon={<FaStar />}
        fullIcon={<FaStar />}
        ></ReactStars>
        </div>
      </div>
        </SwiperSlide>
      ))
    }
    </Swiper>
    }
    </div>
    </div>
  );
};

export default ReviewSlider;
