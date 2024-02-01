import React from 'react'
import Contactform from './Contactform'


const DescriptionForm = () => {
  return (
    <div className='border px-4 py-1 border-richblack-200 rounded-lg mt-12'>
    return (
        <div className='flec flex-col gap-2 text-white w-[11/12] text-center  mx-auto items-center justify-center my-8'>
        <div className='text-white font-inter font-bold text-[1.8rem]'>Got a Idea? We’ve got the skills. Let’s team up</div>
        <div className='text-[1.2rem] font-inter font-bold text-richblack-400'>Tell us more about yourself and what you’re got in mind.</div>
          <Contactform></Contactform>
        </div>
      )
    </div>
  )
}

export default DescriptionForm
