import React from 'react'
import Contactform from '../../Contactpage/Contactform'


const Contactsection = () => {
  return (
    <div className='flec flex-col gap-2 text-white w-[11/12] text-center mx-auto items-center justify-center my-8'>
    <div className='text-white font-inter font-bold text-[1.8rem]'>Get In Touch</div>
    <div className='text-[1.2rem] font-inter font-bold text-richblack-400'>We’d love to here for you, Please fill out this form.</div>
      <Contactform></Contactform>
    </div>
  )
}

export default Contactsection
