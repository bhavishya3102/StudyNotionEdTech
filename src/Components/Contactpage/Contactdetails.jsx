import React from 'react'

import * as Icon1 from "react-icons/bi"
import * as Icon3 from "react-icons/hi2"
import * as Icon2 from "react-icons/io5"

const contactDetails = [
    {
      icon: "HiChatBubbleLeftRight",
      heading: "Chat on us",
      description: "Our friendly team is here to help.",
      details: "info@studynotion.com",
    },
    {
      icon: "BiWorld",
      heading: "Visit us",
      description: "Come and say hello at our office HQ.",
      details:
        "Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016",
    },
    {
      icon: "IoCall",
      heading: "Call us",
      description: "Mon - Fri From 8am to 5pm",
      details: "+123 456 7869",
    },
  ]
const Contactdetails = () => {
  return (
  
      <div className=' border-none ml-12 rounded-xl w-[65%] h-[25vh] -translate-y-32'>
      {
    contactDetails.map((elem,ind) => {
        let Icon=Icon1[elem.icon] || Icon2[elem.icon] || Icon3[elem.icon];
       return  <div key={ind} className='text-white bg-richblack-700 px-6 py-4  '  >
       <div className='flex flex-row gap-2 items-baseline '>
       <div><Icon size={"25"} /></div>
       <h1 className='text-[1.2rem] font-bold'>{elem.heading}</h1>
       </div>

       <p className='text-richblack-200 font-bold'>{elem.description}</p>
       <p  className='text-richblack-200 font-bold'>{elem.details}</p>
       

        </div>
        
    })
      }
      </div>
  
  )
}

export default Contactdetails
