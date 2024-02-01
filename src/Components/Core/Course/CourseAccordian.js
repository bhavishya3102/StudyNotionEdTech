import React, { useEffect, useRef, useState } from 'react'
import { AiOutlineDown } from "react-icons/ai"
import { HiOutlineVideoCamera } from 'react-icons/hi2';
const CourseAccordian = ({course,isActive,handleActive}) => {
  const [active,setactive]=useState(false);
  const contentEl=useRef(null);

  useEffect(() => {
    // isActive is the arrray in which id of section is stored in this if section id is include or not if it is include
    // then mark active as true otherwise false
  setactive(isActive.includes(course._id))
  }, [isActive])
 
  const [sectionheight,setsectionheight]=useState(0)
useEffect(() => {
    //set the sectionheight acording to active state if it is true then set the height and if it is false
    // then set the height is 0 ...
setsectionheight(active?contentEl.current.scrollHeight:0)
}, [active])


    return (
    <div className='overflow-hidden border border-richblack-600 bg-richblack-700 text-richblack-5 '>
    <div>
    <div className={`flex cursor-pointer items-start justify-between bg-opacity-20 px-6 py-6 transition-[0.3s]`}
    onClick={()=>{
        handleActive(course._id)
    }}
    >
    <div>
    <i className={isActive.includes(course._id)? "rotate-180":"rotate-0"}>
   
    <AiOutlineDown />
    </i>
    <p>{course.sectionname}</p>
    <div className='text-yellow-25'>
    <span>{`${course.subsection.length || 0} lecture(s)`}</span>
    </div>
    </div>
    </div>
{/** this is the style component we use to use css inline we use to set the height of the section that we set 
in the state that is sectionheight so we enable the toggle case
*/}
    <div ref={contentEl} className={`relative  bg-richblack-900 transition-[height] duration-[0.35s] ease-[ease]`}
    style={{
        height:sectionheight
    }}
    >
    <div className='text-texthead   bg-richblack-900  flex flex-col gap-2 px-7 py-6 font-semibold'>
    {
        course.subsection.map((subsec,i)=>{
            return (
                <div key={i} className='flex justify-between py-2'>
                <div className='flex items-center gap-2'>
                <span>
                <HiOutlineVideoCamera></HiOutlineVideoCamera>
                </span>
                <p>{subsec.title}</p>
                </div>
                </div>
            )
        })
    }
    
    </div>
    
    </div>
    </div>

   
    </div>
  )
}

export default CourseAccordian
