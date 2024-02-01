import React, { useState } from 'react'
import {HomePageExplore} from "../../../data/homepage-explore";
import HighlightText from './HighlightText'
import CourseCard from '../../../Components/Core/HomePage/CourseCard';





const tabs=[
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths",
];

const Explore = () => {
    const [currenttab,setcurrenttab]=useState(tabs[0]);
    const [courses,setcourses]=useState(HomePageExplore[0].courses);
    const [currentcard,setcurrentcard]=useState(HomePageExplore[0].courses[0].heading);


    
    function setcards(value){
        setcurrenttab(value);
       

          const res=HomePageExplore.filter((course)=>{
            return course.tag===value
          });
        console.log(res);

        setcourses(res[0].courses);
        setcurrentcard(res[0].courses[0].heading);
       
    }
    console.log(currenttab);
    console.log(currentcard);
    console.log(courses);
  
  return (
    <div className='flex flex-col items-center gap-4 mb-36 relative'>

    <div className='flex items-center text-[32px] font-bold  font-inter '>
    Unlock the
    <HighlightText text={" Power of Code"}></HighlightText>
    
    </div>

    <div className='font-bold text-xl text-richblack-400'>Learn to Build Anything You Can Imagine</div>
      <div className='flex flex-row gap-4 items-center mb-8 bg-richblack-700 rounded-[3.5rem] px-8 py-2'>
      {
        tabs.map((val,ind)=>{
            return(
                <div key={ind} className={`${currenttab===val?"bg-richblack-700 text-white":"bg-richblack-700"}  hover:bg-richblack-900 rounded-[3.5rem] px-6 py-2 transition-all duration-200 `} onClick={()=> setcards(val)}>{val}</div>
            )
        })
      }
      </div>

     <div className=''>
     
     <div className='absolute flex flex-row gap-12 items-center'>
      
     {
       courses.map((elem,ind)=>{
           return(
               <CourseCard key={ind} data={elem} currentcard={currentcard} setcurrentcard={setcurrentcard}></CourseCard>
           )
       })
     }
     </div>
     </div>


    
    </div>
  )
}

export default Explore
