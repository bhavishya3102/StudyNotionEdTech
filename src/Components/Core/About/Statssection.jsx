import React from 'react'
const Stats = [
    {count: "5K", label: "Active Students"},
    {count: "10+", label: "Mentors"},
    {count: "200+", label: "Courses"},
    {count: "50+", label: "Awards"},
];
const Statssection = () => {
   
  return (
<div>
<div className='flex flex-row gap-4 items-center justify-around w-[100vw] py-6 bg-richblack-700'>
{
Stats.map((item,ind) => {
   return  <div key={ind} className='flex flex-col gap-1 '>
    <div className='text-white font-bold font-inter text-[1.6rem]'>{item.count}</div>
    <div className='text-richblack-400 font-bold font-inter text-[1.4rem]'>{item.label}</div>

    </div>
    
})
}

</div>
</div>
  )
}

export default Statssection
