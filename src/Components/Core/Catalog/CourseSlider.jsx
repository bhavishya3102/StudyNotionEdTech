
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import '../../../App.css'

// import required modules
import { Pagination, Navigation } from 'swiper/modules';
import CourseCard from './CourseCard';
const CourseSlider = ({courses}) => {
  {
    console.log(courses)
  }
  return (
    <div>
    {
      courses!=undefined && courses.length ?(
        <Swiper
       
        spaceBetween={25}
        breakpoints={{
          1024: {
            slidesPerView: 3,
          },
        }}
      
        navigation={true}
        modules={[Pagination, Navigation]}
        
      >
      {
        courses.map((course,i) =>
         (
         
          
           <SwiperSlide key={i}>
           {
            console.log(course)
           }
           <CourseCard course={course} Height={"h-[30vh]"} > </CourseCard>
           
           </SwiperSlide>
         ))
      }
        
      </Swiper>
      ):(
        <p className="text-xl text-richblack-5">No Course Found</p>
    
      )
    }
    </div>
  )
}

export default CourseSlider
