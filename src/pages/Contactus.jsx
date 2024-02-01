import React from 'react'
import Contactdetails from '../Components/Contactpage/Contactdetails'
import Footer from '../Components/Common/Footer'
import DescriptionForm from '../Components/Contactpage/DescriptionForm'
import ReviewSlider from '../Components/Core/HomePage/ReviewSlider'



const Contactus = () => {
  return (
    <div className='bg-richblack-900 '>
      <div className='flex flex-row gap-4 items-center justify-center '>
      
      {/**left part */}
      
      <div className=''>
      <Contactdetails></Contactdetails>
      </div>
   
      {/**right part */}
      <div className=''>
     < DescriptionForm/>
      </div>
      </div>

      <div className='mt-20'>
      <h2 className="text-white text-[1.7rem] font-bold text-center">Reviews</h2>
  <div className='relative left-24'>
  <ReviewSlider ></ReviewSlider>
  </div>

      </div>

   
   <Footer/>

    </div>
  )
}

export default Contactus
