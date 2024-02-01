import React from 'react'
import HighlightText from './HighlightText'
import know_your_progress  from "../../../assets/Images/Know_your_progress.png"
import compare_with_others from "../../../assets/Images/Compare_with_others.png"
import plan_your_lesson from "../../../assets/Images/Plan_your_lessons.png"
import CTAButton from "../../../Components/Core/HomePage/Button"

const LearningLanguageSection = () => {
  return (
    <div>

    <div className="flex flex-col mx-auto items-center w-11/12 max-w-maxContent gap-4 mt-12 ">
    <p className='text-4xl font-bold font-inter '>Your swiss knife for 
    <HighlightText text={"learning any language"}></HighlightText>
    </p>
    <p className='font-bold text-richblack-500 text-[0.9rem] flex items-center w-[75%] mx-auto text-center '> 
    Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
    </p>



    </div>

    <div className='flex flex-row items-center mx-auto '>

<img src={know_your_progress} className=" translate-x-32 z-0" alt='error'></img>
<img src={compare_with_others} className='z-10' alt='error'></img>
<img src={plan_your_lesson} className=' z-20 -translate-x-36' alt='error'></img>
</div>

<div className='flex items-center mx-auto ml-[45%] mt-4 mb-14'>

<CTAButton active={true} link={"/signup"}>Learn More</CTAButton>
</div>

    
      
    </div>
  )
}

export default LearningLanguageSection
