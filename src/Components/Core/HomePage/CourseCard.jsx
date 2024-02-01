import React from 'react'
import user from "../../../assets/Logo/users.svg"
import lessson from "../../../assets/Logo/fi-sr-chart-tree.svg"

const CourseCard = ({data,currentcard,setcurrentcard}) => {
  return (
    <div className={`flex flex-col gap-8 border border-none ${data.heading===currentcard?"bg-white text-richblack-700 shadow-[5px_5px_rgba(0,_98,_90,_0.4),_10px_10px_rgba(0,_98,_90,_0.3),_15px_15px_rgba(0,_98,_90,_0.2),_20px_20px_rgba(0,_98,_90,_0.1),_25px_25px_rgba(0,_98,_90,_0.05)]":"bg-richblack-700 text-white"} h-[35vh] w-[20vw] px-2 py-2  items-center -translate-x-[28vw] mt-5`}>
      <div className='text-[1.3rem] font-bold font-inter'>{data.heading}</div>
      <div>{data.description}</div>
      <div className='flex flex-row gap-44  border-t-2 items-center pt-2 border-richblack-300'>
      <div className='flex flex-row gap-1'>
      <img src={user} alt='error'></img>
      {data.level}
      </div>
      <div className='flex flex-row gap-1'>
      
      <img src={lessson} alt='error'></img>
      
      {data.lessionNumber}</div>
      </div>
    </div>
  )
}

export default CourseCard
